import React, { useContext, useEffect } from "react"
import PostSide from "../components/PostSide/PostSide"
import ProfileSide from "../components/profileSide/ProfileSide"
import RightSide from "../components/RightSide/RightSide"
import "./Home.css"
import { AppContext } from "../Context"
import { io } from "socket.io-client"
const ENDPOINT = `http://127.0.0.1:5000/`
const socket = io(ENDPOINT);

const Home = () => {

  const { appInfo, setAppInfo } = useContext(AppContext)


  
  useEffect(() => {

    socket.on("connect", () => {
      console.log(`client connected to socket.io`)
    })

    socket.on("disconnect", () => {
      console.log(socket.id)
    })

  }, [])


  return (
    <div className="Home">
      <ProfileSide />
      <PostSide />
      <RightSide />
    </div>
  )
}

export default Home
