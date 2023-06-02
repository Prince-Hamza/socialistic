import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { getUser } from "../../api/UserRequests";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { AppContext } from "../../Context";

const Conversation = ({ data, currentUser, online }) => {

  const { appInfo, setAppInfo } = useContext(AppContext)


  const selectConversation = () => {
    // alert(`selected : ${JSON.stringify(data)}`)
    appInfo.selectedChatRoom.key = data.chatRoomKey
    appInfo.selectedChatRoom._id = data.chatRoomKey
    appInfo.selectedChatRoom.partner = { id: data.partnerId, name: data.name, photo: data.photo }
    setAppInfo({ ...appInfo })
  }


  // alert(`data : ${JSON.stringify(data)}`)

  if (data && appInfo.userInfo && appInfo.chatHistory) {
    return (
      <>
        <div className="follower conversation" onClick={selectConversation} >
          <div>
            {online && <div className="online-dot"></div>}
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
