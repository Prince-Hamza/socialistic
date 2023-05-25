import React, { useState, useRef } from "react";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadVideo, uploadPost } from "../../actions/UploadAction";

const PostShare = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [location, setLocation] = useState(null);
  const desc = useRef();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  
  

  // handle Image Change
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  // handle Video Change
  const onVideoChange = (event) => {
  if (event.target.files && event.target.files[0]) {
    let vid = event.target.files[0];
    setVideo(vid);
    }
  };

  // handle location
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const imageRef = useRef();
  const videoRef = useRef();

  // handle post upload
  const handleUpload = async (e) => {
    e.preventDefault();

    //post data
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
      ...location // ajout des coordonnées géographiques
    };

    // add location to post data if available
    if (location) {
      newPost.location = location;
    }

    // if there is an image with post
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      newPost.image = fileName;
      console.log(newPost);
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }

    // if there is a video with post
    if (video) {
      const data = new FormData();
      const fileName = Date.now() + video.name;
      data.append("name", fileName);
      data.append("file", video);
      newPost.video = fileName;
      console.log(newPost);
      try {
        dispatch(uploadVideo(data));
      } catch (err) {
        console.log(err);
      }
  }
    dispatch(uploadPost(newPost));
    resetShare();
  };
  

  // Reset Post Share
  const resetShare = () => {
    setImage(null);
    setVideo(null);
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
      <div>
        <input
          type="text"
          placeholder="What's happen ?"
          required
          ref={desc}
        />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>

          <div
            className="option"
            style={{ color: "var(--video)" }}
            onClick={() => videoRef.current.click()}
          >
            <UilPlayCircle />
            Video
          </div>
          <div
            className="option"
            style={{ color: "var(--location)" }}
            onClick={getLocation}
            >
            <UilLocationPoint />
            Location                      
          </div>
            {/*location.latitude && location.longitude && (
              <div>
                Latitude: {location.latitude}
                <br />
                Longitude: {location.longitude}
                </div>
            )*/}
          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Shedule
          </div>

          <button
            className="button ps-button"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "uploading" : "Share"}
          </button>

          <div style={{ display: "none" }}>
            <input type="file" ref={imageRef} onChange={onImageChange} />
          </div>
          <div style={{ display: "none" }}>
            <input type="file" ref={videoRef} onChange={onVideoChange} />
          </div>
        </div>

        {image && !video && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="preview" />
          </div>
        )}

        {video && !image && (
          <video  controls>
            <UilTimes onClick={() => setVideo(null)} />
            <source src={URL.createObjectURL(video)} type={video.type} alt="preview"  />
          </video>
        )}

        {/*video && (
          <div className="previewVideo">
            <UilTimes onClick={() => setVideo(null)} />
            <video src={URL.createObjectURL(video)} alt="preview" />
          </div>
        )*/}
      </div>
    </div>
  );
};

export default PostShare;
