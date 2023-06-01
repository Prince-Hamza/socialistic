import React, { useEffect, useState } from "react"
import { UilPen } from "@iconscout/react-unicons"
import ProfileModal from "../ProfileModal/ProfileModal"
import { useParams } from "react-router-dom"
import * as UserApi from "../../api/UserRequests.js"
import { logout } from "../../actions/AuthActions"
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import "./InfoCard.css"

const InfoCard = () => {
  const params = useParams();
  const [modalOpened, setModalOpened] = useState(false);
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const  user = firebase.auth().currentUser 


  const handleLogOut = ()=> {
    
  }


  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user.id) {
        setProfileUser(user);
      } else {
        console.log("fetching")
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
        console.log(profileUser)
      }
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
              data = {user}
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

      <button className="button logout-button" onClick={handleLogOut}>Log Out</button>
    </div>
  );
};

export default InfoCard;
