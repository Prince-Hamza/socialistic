import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { getUser } from "../../api/UserRequests";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { AppContext } from "../../Context";
import { addMessage, getMessages } from "../../api/MessageRequests"

const Conversation = ({ data, currentUser }) => {

  const { appInfo, setAppInfo } = useContext(AppContext)
const online = appInfo.online


  const fetchMessages = async (id) => {
    alert(`chat key : ${id}`)
    try {
      const { data } = await getMessages(id)
      appInfo.messages = data
      alert(`conversations :: ${data}`)
      setAppInfo({ ...appInfo })
    } catch (error) {
      alert(error);
    }
    //    setLoadedHistory(true)
  }


  const selectConversation = async () => {
    appInfo.selectedChatRoom.key = data.chatRoomKey
    appInfo.selectedChatRoom._id = data.chatRoomKey
    appInfo.selectedChatRoom.partner = { id: data.partnerId, name: data.name, photo: data.photo }
    await fetchMessages(data.chatRoomKey)
    setAppInfo({ ...appInfo })
  }


  // alert(`data : ${JSON.stringify(data)}`)

  if (data && appInfo.userInfo && appInfo.chatHistory) {
    return (
      <>
        <div className="follower conversation" onClick={selectConversation} >
          <div>
            {/* {online && <div className="online-dot"></div>} */}
            <img
              src={data.photo}
              alt={data.photo}
              className="followerImage"
              style={{ width: "50px", height: "50px" }}
            />
            <div className="name" style={{ fontSize: '0.8rem' }}>
              <span>{data.name}</span>
              <span style={{ color: online ? "#51e200" : "" }}>{online ? "Online" : "Offline"}</span>
            </div>
          </div>
        </div>
        <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
      </>
    )
  } else {
    return null
  }

}

export default Conversation;
