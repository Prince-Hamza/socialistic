import React, { useContext, useState } from "react";
import "./ProfileCard.css";
//import Cover from "../../img/cover.jpg";
//import Profile from "../../img/profileImg.jpg";
import { useNavigate } from "react-router-dom";
import FollowersModal from "../FollowersModal/FollowersModal";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { AppContext } from "../../Context";
import { Row } from "react-bootstrap";


const ProfileCard = ({ location }) => {

  const { appInfo, setAppInfo } = useContext(AppContext)
  const user = firebase.auth().currentUser
  const navigate = useNavigate()
  const posts = []

  //const [modalOpened, setModalOpened] = useState(false);
  const [followersModalOpened, setFollowersModalOpened] = useState(false);
  const [followingModalOpened, setFollowingModalOpened] = useState(false);

  return (
    <div className="ProfileCard">

      <div className="ProfileImages">
        <img src={appInfo.userInfo.profilePicture} alt="CoverImage" />
        <img src={appInfo.userInfo.profilePicture} alt="ProfileImage" />
      </div>

      <div className="ProfileName">
        <span>{appInfo.userInfo.username}</span>
        <Row>
          <span>{'Write about yourself'}</span>
        </Row>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{appInfo.userInfo.followers.length}</span>
            {/* <span>{'user'}</span> */}
            <span onClick={() => setFollowersModalOpened(true)} style={{ cursor: 'pointer' }}>Followers</span>

            <FollowersModal
              modalOpened={followersModalOpened}
              setModalOpened={setFollowersModalOpened}
              followers={'user.followers'}
            />


          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{appInfo.userInfo.following.length}</span>
            <span onClick={() => setFollowingModalOpened(true)} style={{ cursor: 'pointer' }}>Following</span>

            {/* <FollowersModal
              modalOpened={followingModalOpened}
              setModalOpened={setFollowingModalOpened}
              following={appInfo.userInfo.following} // Passer les données des personnes que vous suivez à la fenêtre modale
            /> */}



          </div>
          {/* for profilepage */}
          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{
                  posts.filter((post) => post.userId === user.id).length
                }</span>
                <span>Posts</span>
              </div>{" "}
            </>
          )}
        </div>
        <hr />
      </div>

      {location === "profilePage" ? (
        ""
      ) : (
        <span onClick={() => { navigate(`/profile/${appInfo.userInfo.id}`) }} >
          My Profile
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
