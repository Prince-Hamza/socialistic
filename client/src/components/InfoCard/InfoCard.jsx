import React, { useContext, useEffect, useState } from "react"
import { UilPen } from "@iconscout/react-unicons"
import ProfileModal from "../ProfileModal/ProfileModal"
import { useNavigate, useParams } from "react-router-dom"
import * as UserApi from "../../api/UserRequests.js"
import { logout } from "../../actions/AuthActions"
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import "./InfoCard.css"
import { AppContext } from "../../Context"
import { toast } from "react-toastify"
import { interact } from "../../backend/chat/chat"

const InfoCard = () => {

  const params = useParams()

  const { appInfo, setAppInfo } = useContext(AppContext)
  const [modalOpened, setModalOpened] = useState(false)
  const profileUserId = params.id
  const [profileUser, setProfileUser] = useState({})
  const user = firebase.auth().currentUser
  const navigate = useNavigate()


  const sendMessage = async () => {

    // me : user
    let me = user.providerData[0]
    me.uid = user.uid
    // partner :  appInfo.selectedPartner
    let partner = appInfo.selectedPartner

    const result = await interact(me, partner)
    appInfo.chatHistory = result.conversations
    setAppInfo({ ...appInfo })

    // alert(`conversations :: ${JSON.stringify(result.conversations)}`)

    //navigate(`/chat/${me.uid}/${partner.id}`)
    navigate('/chat')

  }
  


  useEffect(() => {
    const fetchProfileUser = async () => {
      // if (profileUserId === user.id) {
      //   setProfileUser(user);
      // } else {
      //   console.log("fetching")
      //   const profileUser = await UserApi.getUser(profileUserId);
      //   setProfileUser(profileUser);
      //   console.log(profileUser)
      // }
      setProfileUser(user)
    }
    fetchProfileUser()
  }, [user, profileUserId]);

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user.id === profileUserId ? (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="info">
        {/* */}
        <span>
          <b>Status </b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{profileUser.livesIn}</span>
      </div>
      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{profileUser.worksAt}</span>
      </div>

      <button className="button logout-button" onClick={sendMessage}> Message  </button>
    </div>
  );
};

export default InfoCard;
