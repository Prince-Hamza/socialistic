import React, { useContext, useEffect, useState } from "react"
import { useRef } from "react"
import { addMessage, getMessages } from "../../api/MessageRequests"
import { getUser } from "../../api/UserRequests"
import { format } from "timeago.js"
import InputEmoji from 'react-input-emoji'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import "./ChatBox.css"
import { AppContext } from "../../Context"


const ChatBox = ({ setSendMessage, receivedMessage }) => {

  const { appInfo, setAppInfo } = useContext(AppContext)
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("")

  const chat = appInfo.selectedChatRoom
  const currentUser = appInfo.userInfo

  const handleChange = (newMessage) => {
    setNewMessage(newMessage)
  }


  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id)
        alert(`messages : ${JSON.stringify(data)}`)
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    //  if (chat !== null) fetchMessages();
  }, [chat]);


  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])



  // Send Message
  const handleSend = async () => {

    const message = {
      chatRoomKey: appInfo.selectedChatRoom.key,
      messageId: Math.random().toString(),
      myId: appInfo.userInfo.id,
      partnerId: appInfo.selectedChatRoom.partner.id,
      text: newMessage,
    }

    //alert(`${JSON.stringify(message)}`)

    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("")
    }
    catch
    {
      console.log("error")
    }


  }

  // Receive Message from parent component
  /*useEffect(()=> {
    console.log("Message Arrived: ", receivedMessage)
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  
  },[chat, receivedMessage])*/

  useEffect(() => {
    console.log("Message Arrived: ", receivedMessage);
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      const updatedMessages = [...messages, receivedMessage];
      setMessages(updatedMessages);
      localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
    }
  }, [chat, receivedMessage]);

  useEffect(() => {
    const storedMessages = localStorage.getItem("chatMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);





  const scroll = useRef();
  const imageRef = useRef();

  return (
    <>

      <div className="ChatBox-container">
        {appInfo.selectedChatRoom.partner && chat ? (
          <>
            {/* chat-header */}
            <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src={appInfo.selectedChatRoom.partner.photo}
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>
                      {appInfo.selectedChatRoom.partner.name}
                    </span>
                  </div>
                </div>
              </div>
              <hr
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
            </div>
            {/* chat-body */}
            <div className="chat-body" >
              {messages.map((message) => (
                <>
                  <div ref={scroll}
                    className={
                      message.senderId === currentUser
                        ? "message own"
                        : "message"
                    }
                  >
                    <span>{message.text}</span>{" "}
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>
            {/* chat-sender */}
            <div className="chat-sender">
              <div onClick={() => imageRef.current.click()}>+</div>
              <InputEmoji
                value={newMessage}
                onChange={handleChange}
              />
              <div className="send-button button" onClick={handleSend}>Send</div>
              <input
                type="file"
                name=""
                id=""
                style={{ display: "none" }}
                ref={imageRef}
              />
            </div>{" "}
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
