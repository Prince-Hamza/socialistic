import React, { useEffect, useState } from "react"
import { getTimelinePosts } from "../../actions/PostsAction"
import Post from "../Post/Post"
import { useSelector, useDispatch } from "react-redux"
import "./Posts.css"
import { useParams } from "react-router-dom"
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import axios from 'axios'

const Posts = () => {

  const params = useParams();
  const user = firebase.auth().currentUser

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)




  const init = () => {

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:5000/posts/timeline?id=goY8Tr57lze9qKyoWifcllps3EA3',
      headers: {}
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data))
        let list = response.data.posts
        setPosts([...list])
      })
      .catch((error) => {
        console.log(error)
      })

  }

  const effect = () => {
    init()
  }


  useEffect(effect, [])


  return (
    <div className="Posts">
      {loading ? (
        "Fetching posts...."
      ) : (
        posts.map((post, id) => {
          return <Post data={post} key={id} />;
        })
      )}
    </div>
  )
}

export default Posts;


