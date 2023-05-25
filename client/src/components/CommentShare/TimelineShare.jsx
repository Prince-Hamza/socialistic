import React, { useState, useRef } from "react"
import "./TimelineShare.css"
import { useDispatch, useSelector } from "react-redux"
import { uploadComment } from "../../actions/UploadAction"

const CommentShare = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.postReducer.uploading);
  const [location, setLocation] = useState(null);
  const desc = useRef();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;


  // handle comment upload
  const handleUpload = async (e) => {
    e.preventDefault();

    //comment data
    const newComment = {
      userId: user._id,
      desc: desc.current.value,
      ...location // ajout des coordonnées géographiques
    };

    dispatch(uploadComment(newComment));
    resetShare();
  };
  

  // Reset Comment Share
  const resetShare = () => {
    desc.current.value = "";
  };


  return (
    <div className="PostShare">
      <img
        src={
          user.profilePicture
            ? serverPublic + user.profilePicture
            : serverPublic + "defaultProfile.png"
        }
        alt="Profile"
      />
      <div className="commentOptions">
        <input
          type="text"
          placeholder="What's happening ?"
          required
          ref={desc}
        />
          
        <button
          className="button ps-button"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "uploading" : "Share"}
        </button>
        
      </div>
    </div>
  );
};

export default CommentShare;
