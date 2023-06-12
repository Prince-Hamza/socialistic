import React, { useState, useEffect, useRef, useContext, useMemo } from "react";
import moment from "moment";
import "./Post.css";
import Com from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { likePost } from "../../api/PostsRequests";
import { useNavigate } from "react-router-dom";
import edit from '../../img/edit.png';
import ShareModal from "../ShareModal/ShareModal";
import { deletePost, updatePost } from "../../api/PostsRequests";
import { getUserById } from "../../api/UserRequests";
import CommentShare from '../CommentShare/CommentShare.jsx';
import Comment from "../Comment/Comment";
import { createComment } from "../../api/CommentsRequests";
import axios from 'axios'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { AppContext } from "../../Context";
import { domain } from "../../constants/constants";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";



const Post = ({ data, posts, setPosts }) => {

  const { appInfo, setAppInfo } = useContext(AppContext)
  const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);
  const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY })
  var user = firebase.auth().currentUser

  const [liked, setLiked] = useState(data.likes.includes(appInfo.userInfo.id))
  const [likes, setLikes] = useState(data.likes.length);
  const [showdrop, setshowdrop] = useState(false);
  const navigate = useNavigate();

  const [comments, setComments] = useState(data.comments ? data.comments : [])

  const [isShare, setIsShare] = useState(false);
  const [isCommentInputVisible, setIsCommentInputVisible] = useState(false)

  const [comment, setComment] = useState("")

  const handleToggleCommentInput = () => {
    setIsCommentInputVisible((prev) => !prev);
    setComment(""); // Réinitialiser le commentaire lors du basculement de l'entrée de commentaire
  }


  const handleLike = () => {

    let postData = JSON.stringify({
      "userId": appInfo.userInfo.id,
      "postId": data._id
    })

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${domain}/posts/like`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: postData
    }

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data))
        posts.forEach((post) => {
          if (post._id === data._id) {
            if (!liked) post.likes.push(appInfo.userInfo.id)
            if (liked) post.likes.splice(0, 1)
          }
        })
        setPosts([...posts])
      })
      .catch((error) => {
        console.log(error);
      })

    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)

  }


  const handleDelete = () => {
    setshowdrop(false);
    navigate('/')
  };

  const handleUpdate = () => {
    const updatedPost = { ...data, edit: true, title: "Updated Title" };
    // dispatch(updatePost(data.id, updatedPost));
    setshowdrop(false);
  };


  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setshowdrop(false);
  }


  const [open, setOpen] = useState(false);
  let menuRef = useRef();



  const handleVideoEnd = (event) => {
    event.target.currentTime = 0
  }


  const media = (
    <div>
      {data.images &&
        <div>
          {data.images.map((image) => {
            return (
              <img
                style={{ width: '45%', height: '200px', margin: '1px', cursor: 'pointer' }}
                onClick={() => { window.open(image, '_blank') }}
                src={image}
                alt={image}
              />
            )
          })}
        </div>
      }

      {data.videos &&
        <div>
          {data.videos.map((video) => {
            return (
              <video style={{ width: '45%', height: '200px', margin: '1px', cursor: 'pointer' }} controls onEnded={handleVideoEnd} src={video} >

              </video>
            )
          })}
        </div>
      }



      {data.locations &&
        <div>
          {data.locations.map((location) => {
            return (
              <div style={{ width: '100%', height: 'auto' }} >
                {isLoaded &&
                  <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '500px' }}
                    center={{ lat: location.latitude, lng: location.longitude }}
                    zoom={10}
                  />
                }
              </div>
            )
          })}
        </div>
      }


      {data.dates &&
        <div>
          <div className="option" style={{ color: "var(--shedule)" }}>
            <input type="Date"
              style={{ marginRight: 4, border: '0', color: "var(--shedule)", marginLeft: 5, fontSize: '13px' }} />
          </div>
        </div>
      }


    </div>
  )


  return (
    <div className="Post">
      <div className="Postheader">
        <div className="PostInfo">
          {user.id === data?.userId ?
            <img
              src={data.profilePicture}
              alt="ProfileImage"
            /> :
            <img
              src={data.profilePicture}
              alt="ProfileImage"
            />}
          <div className="PostInfoUser">
            <span className="user">
              {data.username}
            </span>


            <span className="timeago">
              {moment.utc(data.createdAt).fromNow()}
            </span>
          </div>
        </div>
        <div className="postcardheaderdown">

          {window.location.href.includes('profile') && <div className='menu-trigger' onClick={() => { setOpen(!open) }}>
            <p onClick={() => setshowdrop(!showdrop)}>ooo</p>
            <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} style={{ marginRight: '-12px' }} >
              <ul>
                <DropdownItem img={edit} text={"Edit"} onClick={() => handleUpdate(data)} />
                <DropdownItem img={edit} text={"Remove Post"} onClick={handleDelete} />
                <DropdownItem img={edit} text={"Download"} onClick={handleCopyLink} />
              </ul>
            </div>
          </div>}


        </div>
      </div>
      <div className="detail" style={{ alignSelf: "flex-start" }}>

        <span>{data.text}</span>
      </div>
      {media}
      <div className="postReact">

        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />

        <img src={Com} alt="" style={{ cursor: 'pointer' }} onClick={handleToggleCommentInput} />

        {/* <img src={Share} alt="" onClick={() => setIsShare(!isShare)} style={{ cursor: 'pointer' }} /> */}

      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px", alignSelf: "flex-start" }}>
        {data.likes.length} likes
      </span>

      {isCommentInputVisible && (
        <>
          {<CommentShare postId={data._id} visible={setIsCommentInputVisible} />}
        </>
      )}


      {comments.map((item) => (
        <Comment key={item.id} data={item} />
      ))}


    </div>
  )
}


function DropdownItem(props) {
  return (
    <li className='dropdownItem'>
      <img src={props.img} alt=""></img>
      <span> {props.text} </span>
    </li>
  );
}

export default Post
