import React, { useContext, useRef, useState } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import Conversation from "../../components/Conversation/Conversation";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import NavIcons from "../../components/NavIcons/NavIcons";
import "./Chat.css";
import { useEffect } from "react";
// import { userChats } from "../../api/ChatRequests";
// import { io } from "socket.io-client";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { AppContext } from "../../Context";

const Chat = () => {

  const socket = useRef();

  const { appInfo, setAppInfo } = useContext(AppContext)
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [activeUsers, setActiveUsers] = useState([{ userId: '123', profilePicture: '' }]);

  const user = appInfo.userInfo

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      // try {
      //   const { data } = await userChats(user.id);
      //   setChats(data);
      // } catch (error) {
      //   console.log(error);
      // }
    };
    // alert(appInfo.chatHistory.length)
    if (!appInfo.chatHistory.length) getChats()
  }, []);




  //Afficher les utilisateurs actifs dans le chatbox
  const checkOnlineStatus = (chat) => {
    return false
  };



  const startChat = (user) => {
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



          <div className="Chat-list" >
            {appInfo.chatHistory.map((chat) => (
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
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  )
}

export default Chat













