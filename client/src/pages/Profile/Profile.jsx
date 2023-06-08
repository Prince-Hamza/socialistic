import React from "react"
import PostSide from "../../components/PostSide/PostSide"
import ProfileCard from "../../components/ProfileCard/ProfileCard"
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft"
import RightSide from "../../components/RightSide/RightSide"
import "./Profile.css"
import ProfileCardUser from "../../components/ProfileCardUser/ProfileCardUser"


const Profile = () => {
  return (
    <div className="Profile">
      <ProfileLeft />
      <div className="Profile-center">
        {window.location.href.includes('user') ? <ProfileCardUser /> : <ProfileCard location='profilePage' />}
        <PostSide />
      </div>
      <RightSide />
    </div>
  );
};

export default Profile;
