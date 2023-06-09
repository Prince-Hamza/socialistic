import React, { useContext, useEffect, useState } from "react"
import { useRef } from "react"
import { addMessage, getMessages } from "../../api/MessageRequests"
import { format } from "timeago.js"
import InputEmoji from 'react-input-emoji'
import "./ChatBox.css"
import { AppContext } from "../../Context"
import Messages from "../Messages/Messages"
import _ from 'lodash'
import { io } from "socket.io-client"
import $ from 'jquery'
import { main } from "../Live/backend"
const ENDPOINT = `http://127.0.0.1:5000/`
const socket = io(ENDPOINT);

const ChatBox = ({ setSendMessage, receivedMessage }) => {

  const { appInfo, setAppInfo } = useContext(AppContext)
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("")
  const [loadedHistory, setLoadedHistory] = useState(false)
  const [listenToMongo, setListenToMongo] = useState(false)
  const [listening, setListening] = useState(false)
  const chat = appInfo.selectedChatRoom
  const currentUser = appInfo.userInfo


  const fetchMessages = async () => {
    try {
      const { data } = await getMessages(chat._id)
      setMessages(data)
    } catch (error) {
      console.log(error);
    }
    setLoadedHistory(true)
  }

  //if (appInfo.selectedChatRoom && appInfo.selectedChatRoom.key && !loadedHistory) fetchMessages()


  const handleChange = (newMessage) => {
    setNewMessage(newMessage)
  }


  
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
      await addMessage(message);
      // setMessages([...messages]);
      setNewMessage("")
    }
    catch {
      console.log("error")
    }


    var scroll = $('.chat-body');
    scroll.animate({ scrollTop: '8000px' });

  }

  const handleOnEnter = () => {
    handleSend()
  }



  const scroll = useRef();
  const imageRef = useRef();

  const sendCall = () => {
    appInfo.call = true
    appInfo.chat = false
    appInfo.callType = 'sending'
    setAppInfo({ ...appInfo })
  }

  const recieveCall = (key) => {
    appInfo.call = true
    appInfo.chat = false
    appInfo.callType = 'recieving'
    appInfo.liveStreamingKey = key
    setAppInfo({ ...appInfo })
  }


  return (
    <>

      <div className="ChatBox-container">
        {appInfo.selectedChatRoom.partner && chat ? (
          <>
            {/* chat-header */}
            <div className="chat-header">
              <div className="follower" >
                <div  >
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

                <button onClick={sendCall} >   Send Call   </button>
                <button onClick={recieveCall} >   Recieve Call   </button>

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


            <Messages scroll={scroll} />

            {/* chat-sender */}
            <div className="chat-sender">
              <div onClick={() => imageRef.current.click()}>+</div>
              <InputEmoji
                value={newMessage}
                onChange={handleChange}
                onEnter={handleOnEnter}
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
