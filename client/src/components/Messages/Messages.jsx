import React, { useContext, useRef , useEffect} from 'react'
import { AppContext } from '../../Context'
import { format } from "timeago.js"
import { io } from "socket.io-client"
const ENDPOINT = `http://127.0.0.1:5000/`
const socket = io(ENDPOINT);

function Messages({scroll}) {

    const { appInfo, setAppInfo } = useContext(AppContext)

    
    
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [])

//   const socketListener = () => {

//     socket.on('message', (data) => {
//       if (data && Object.keys(data).length) {
//         //alert(`message event :: ${JSON.stringify(data.fullDocument)}`)
//         let list = messages
//         list.push(data.fullDocument)
//         // alert(`length prexisting  : ${list.length}`)
//         setMessages(list)
//       }
//     })

//     socket.on("disconnect", () => { console.log(socket.id) })

//   }

//   useEffect(() => {
//     if (!listening) socketListener()
//   }, [])


    return (
        <div className='chat-body'>
            {appInfo.messages.map((message) => {
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
        </div>
    )
}

export default Messages