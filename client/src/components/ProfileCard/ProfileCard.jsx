import React, { useState } from "react";
import "./ProfileCard.css";
//import Cover from "../../img/cover.jpg";
//import Profile from "../../img/profileImg.jpg";
import { Link } from "react-router-dom";
import FollowersModal from "../FollowersModal/FollowersModal";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'


const ProfileCard = ({ location }) => {

  const user = firebase.auth().currentUser

  const posts = []
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  //const [modalOpened, setModalOpened] = useState(false);
  const [followersModalOpened, setFollowersModalOpened] = useState(false);
  const [followingModalOpened, setFollowingModalOpened] = useState(false);


  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        {/* <img src={
          user.coverPicture
            ? serverPublic + user.coverPicture
            : serverPublic + "defaultCover.jpg"
        } 
        alt="CoverImage" />
        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt="ProfileImage"
        /> */}
      </div>
      <div className="ProfileName">
        <span>{user.displayName}</span>
        <span>{user.worksAt ? user.worksAt : 'Write about yourself'}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            {/* <span>{'user.followers.length'}</span> */}
            <span>{'user'}</span>
            <span onClick={() => setFollowersModalOpened(true)} style={{ cursor: 'pointer' }}>Followers</span>

            <FollowersModal
              modalOpened={followersModalOpened}
              setModalOpened={setFollowersModalOpened}
              followers={'user.followers'}
            />


          </div>
          <div className="vl"></div>
          <div className="follow">
            {/* <span>{'user.following.length'}</span> */}
            <span> {'users'} </span>
            <span onClick={() => setFollowingModalOpened(true)} style={{ cursor: 'pointer' }}>Following</span>
            <FollowersModal
              modalOpened={followingModalOpened}
              setModalOpened={setFollowingModalOpened}
              following={'user.following'} // Passer les données des personnes que vous suivez à la fenêtre modale
            />



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
        <span>
          <Link to={`/profile/${user.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
