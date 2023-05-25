import React, {useState} from "react";
import "./ProfileCard.css";
//import Cover from "../../img/cover.jpg";
//import Profile from "../../img/profileImg.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FollowersModal from "../FollowersModal/FollowersModal";
//import FollowingsModal from "../FollowingsModal/FollowingsModal";

const ProfileCard = ({location}) => {
  
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state)=>state.postReducer.posts);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  //const [modalOpened, setModalOpened] = useState(false);
  const [followersModalOpened, setFollowersModalOpened] = useState(false);
  const [followingModalOpened, setFollowingModalOpened] = useState(false);



  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={
            user.coverPicture
              ? serverPublic + user.coverPicture
              : serverPublic + "defaultCover.jpg"
          } alt="CoverImage" />
        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt="ProfileImage"
        />
      </div>
      <div className="ProfileName">
        <span>{user.firstname} {user.lastname}</span>
        <span>{user.worksAt? user.worksAt : 'Write about yourself'}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span onClick={() => setFollowersModalOpened(true)} style={{cursor: 'pointer'}}>Followers</span>
              <FollowersModal
              modalOpened={followersModalOpened}
              setModalOpened={setFollowersModalOpened}
              followers={user.followers} // Passer les données des followers à la fenêtre modale
              />


          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span onClick={() => setFollowingModalOpened(true)} style={{cursor: 'pointer'}}>Following</span>
            <FollowersModal
            modalOpened={followingModalOpened}
            setModalOpened={setFollowingModalOpened}
            following={user.following} // Passer les données des personnes que vous suivez à la fenêtre modale
            />



          </div>
          {/* for profilepage */}
          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{
                posts.filter((post)=>post.userId === user._id).length
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
          <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
