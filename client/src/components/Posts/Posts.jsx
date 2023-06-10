import React, { useContext, useEffect, useState } from "react"
import { getTimelinePosts } from "../../actions/PostsAction"
import Post from "../Post/Post"
import { useSelector, useDispatch } from "react-redux"
import "./Posts.css"
import { useParams } from "react-router-dom"
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import axios from 'axios'
import { AppContext } from "../../Context"

const Posts = () => {

  const params = useParams();
  const user = firebase.auth().currentUser

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [complete, setComplete] = useState(false)

  const { appInfo, setAppInfo } = useContext(AppContext)



  const getPostsByFollowedUsers = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:5000/posts/timeline?id=${appInfo.userInfo.id}`,
      headers: {}
    };

    axios.request(config)
      .then((response) => {
        let list = response.data.posts
        // alert(`timeline posts :: ${JSON.stringify(list)}`)
        setPosts([...list])
        setLoading(false)
        setComplete(true)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getMyPosts = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:5000/posts/timeline?id=${appInfo.userInfo.id}`,
      headers: {}
    };

    axios.request(config)
      .then((response) => {
        let list = response.data.posts
        // alert(`timeline posts :: ${JSON.stringify(list)}`)
        setPosts([...list])
        setLoading(false)
        setComplete(true)
      })
      .catch((error) => {
        console.log(error)
      })

  }



  const init = () => {
    setLoading(true)
    if (window.location.href.includes(user)) getMyPosts()
    if (!window.location.href.includes(user)) getPostsByFollowedUsers()
  }

  const effect = () => {
    if (!complete && appInfo.userInfo.id) init()
  }


  useEffect(effect, [])


  return (
    <div className="Posts">
      {loading ? (
        "Fetching posts...."
      ) : (
        posts.map((post, id) => {
          return <Post data={post} key={id} />;
          // return null
        })
      )}


      {!posts.length && complete && <span style={{ marginLeft: '38%' }} > No posts to show </span>}

    </div>
  )
}

export default Posts;


