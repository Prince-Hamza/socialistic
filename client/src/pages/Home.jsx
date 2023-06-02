import React, { useContext } from "react"
import PostSide from "../components/PostSide/PostSide"
import ProfileSide from "../components/profileSide/ProfileSide"
import RightSide from "../components/RightSide/RightSide"
import "./Home.css"
import { AppContext } from "../Context"

const Home = () => {

  const { appInfo, setAppInfo } = useContext(AppContext)

  return (
    <div className="Home">
      <ProfileSide />
      <PostSide />
      <RightSide />
    </div>
  )
}

export default Home
