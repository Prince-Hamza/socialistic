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


  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])





  // onMessage | EventListener

  const socketListener = () => {
    // alert(`socket listener : ${listening}`)
    socket.on('message', (data) => {
      if (data && Object.keys(data).length) {
        //alert(`message event :: ${JSON.stringify(data.fullDocument)}`)
        let list = appInfo.messages
        let nm = data.fullDocument
        list.push(nm)
        list = _.uniqBy(list, 'text')
        // alert(`length prexisting  : ${list.length}`)
        appInfo.messages = list
        setAppInfo({ ...appInfo })
      }
    })

    socket.on("disconnect", () => { console.log(socket.id) })

  }

  useEffect(() => {
    if (!listening) socketListener()
  }, [])




  // Send Message
  const handleSend = async () => {


    if (!listenToMongo) {
      //alert('emit listen')
      socket.emit('listen', { chatRoomKey: appInfo.selectedChatRoom.key })
      setListenToMongo(true)
    }

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
  }



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
            {/* <div className="chat-body" >
              {messages.map((message) => {
                return (
                  <div key={Math.random()} style={{ display: 'flex', justifyContent: message.myId === appInfo.userInfo.id ? 'flex-start' : 'flex-end' }} >
                    <div ref={scroll}
                      className={message.myId === appInfo.userInfo.id ? "message own" : "message"}
                    >
                      <span>{message.text}</span>{" "}
                      <span>{format(message.createdAt)}</span>
                    </div>
                  </div>
                )
              })}
            </div> */}

            <Messages scroll={scroll} />

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
