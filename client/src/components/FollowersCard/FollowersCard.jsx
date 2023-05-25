import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import FollowersModal from "../FollowersModal/FollowersModal";
import { getAllUser } from "../../api/UserRequests";
import User from "../User/User";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Importez votre image par défaut
//import defaultProfileImage from "../../path/to/defaultProfileImage.jpg";

const FollowersCard = ({ location }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [persons, setPersons] = useState([]);
  const [displayCount, setDisplayCount] = useState(8);
  const { user } = useSelector((state) => state.authReducer.authData);

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const navigate = useNavigate();

  const handleProfileClick = (followerId) => {
    navigate(`/profile/${followerId}`);
  };

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser(displayCount, [
        ...user.following,
        user._id,
      ]);
      const filteredPersons = data.filter((person) => person._id !== user._id);
      setPersons(filteredPersons);
    };
    fetchPersons();
  }, [user.following, user._id, displayCount]);

  const handleSeeMore = () => {
    setDisplayCount(persons.length);
  };

  return (
    <div className="FollowersCard">
      <h3>Suggestions</h3>

      {persons.map((person) => (
        <div
          key={person._id}
          onClick={() => handleProfileClick(person._id)}
          style={{ cursor: "pointer" }}
        >
          {location === "profilePage" ? (
            ""
          ) : (
            <User
              person={person}
              profileImage={person.profilePicture || serverPublic + "defaultProfile.png"}
            />
          )}
        </div>
      ))}

      {displayCount < persons.length && !location && (
        <span onClick={handleSeeMore}>See more</span>
      )}

      <FollowersModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        persons={persons}
      />
    </div>
  );
};

export default FollowersCard;
