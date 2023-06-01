import React, { useRef, useState } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import Conversation from "../../components/Conversation/Conversation";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import NavIcons from "../../components/NavIcons/NavIcons";
import "./Chat.css";
import { useEffect } from "react";
import { userChats } from "../../api/ChatRequests";
import { io } from "socket.io-client";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const Chat = () => {

  const socket = useRef();
  const user = firebase.auth().currentUser

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user.id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user.id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user.id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);


  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data)
      setReceivedMessage(data);
    }

    );
  }, []);


  //Afficher les utilisateurs actifs dans le chatbox
  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user.id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:8800");
    socket.on("get-users", (users) => {
      setActiveUsers(users);
    });
  }, []);

  const startChat = (user) => {
    // Mettre à jour l'état pour stocker les données du chat
    setCurrentChat({
      members: [user.userId, user.id],
      conversation: [],
    });
  };


  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch />


        <div className="Chat-container">

          <h2>Chats</h2>
          <hr style={{ width: '100%', border: '0.3px solid #f4cb35' }}></hr>
          <div className="chatonlineuser">

            {/*<h2>Active Users:</h2>*/}

            <ul style={{ border: 'solid 1px' }} >
              {activeUsers.map((user) => (
                <li key={user.userId} onClick={() => startChat(user)}>
                  <div className="ChatPostInfo">
                    <img
                      src={
                        user.profilePicture
                          ? serverPublic + user.profilePicture
                          : serverPublic + "defaultProfile.png"
                      }
                      alt="ProfileImage"
                    />

                    <div className="online-dot"></div>
                    <div className="ChatPostInfoUser">
                      <span className="user">{user.firstname} {user.lastname}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="Chat-list" style={{ border: 'solid 1px' }} >
            {chats.map((chat) => (
              <div
                onClick={() => {
                  setCurrentChat(chat);
                }}
              >
                <Conversation
                  data={chat}
                  currentUser={user.id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end", marginRight: '25px' }}>
          <NavIcons />
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user.id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
};

export default Chat













