import React, { useContext, useEffect } from "react"
import PostSide from "../components/PostSide/PostSide"
import ProfileSide from "../components/profileSide/ProfileSide"
import RightSide from "../components/RightSide/RightSide"
import "./Home.css"
import { AppContext } from "../Context"
import { io } from "socket.io-client"
import { Row, Col, Container } from "react-bootstrap"
import CustomNavbar from "../components/Navbar/Navbar"
import GlobalSocketListener from "../listener/globalSocketListener"
import { domain } from "../constants/constants"


const Home = () => {

  const { appInfo, setAppInfo } = useContext(AppContext)

  useEffect(() => {


    const socket = io(domain, {
      autoConnect: false,
    })

    socket.on('connect', () => {
      console.log('Connected')
      console.log(`${socket.id} is connected to socket.io`)
      // alert(`${socket.id} is connected to socket.io`)
      socket.emit('joined', { userId: appInfo.userInfo.id })
    })


    socket.on('onlineUsers', (onlineList) => {
      // alert('onlineUsers')
      // alert(`onlineUsers : count : ${onlineList.length} , data: ${JSON.stringify(onlineList)} `)
      appInfo.onlineUsers = onlineList
      setAppInfo({ ...appInfo })
    })

    socket.open()



    appInfo.postsForPage = 'home'
    setAppInfo({ ...appInfo })

  }, [])


  return (
    <Container fluid>
      <CustomNavbar />
      <Row className="Home flex-sm-col flex-md-row flex-lg-row  flex-column">
        <Col lg={3}> <ProfileSide /> </Col>
        <Col lg={5}> <PostSide /> </Col>
        <Col lg={3} ><RightSide /></Col>
      </Row>
      <GlobalSocketListener />
    </Container>
  )
}

export default Home
