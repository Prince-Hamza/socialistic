import React, { useState } from "react";
import "./ProfileCard.css";
//import { Link } from "react-router-dom";
//import { useSelector } from "react-redux";
//import FollowersModal from "../FollowersModal/FollowersModal";
import FollowingModal from "../FollowingModal/FollowingModal";

const ProfileCard = ({ location }) => {
  // ...

  const [followingModalOpened, setFollowingModalOpened] = useState(false);

  return (
    <div className="ProfileCard">
      {/* ... */}
      <div className="followStatus">
        <hr />
        <div>
          {/* ... */}
          <div className="follow">
            {/* ... */}
            <span onClick={() => setFollowingModalOpened(true)} style={{ cursor: "pointer" }}>
              Following
            </span>
            <FollowingModal
              modalOpened={followingModalOpened}
              setModalOpened={setFollowingModalOpened}
              following={user.following} // Passer les données des personnes que vous suivez
            />
          </div>
          {/* ... */}
        </div>
        <hr />
      </div>
      {/* ... */}
    </div>
  );
};

export default ProfileCard;
