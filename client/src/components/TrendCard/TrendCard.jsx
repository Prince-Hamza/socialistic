import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../Context.js'
import { Image, Row } from 'react-bootstrap'
import { io } from "socket.io-client"
import { domain } from '../../constants/constants.js'
import axios from 'axios'
import _ from 'lodash'

import './TrendCard.css'


const TrendCard = () => {

  const { appInfo, setAppInfo } = useContext(AppContext)
  const [complete, setComplete] = useState(false)



  const getOnlineUsers = async () => {

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${domain}/user`,
      headers: {}
    };


    try {
      const response = await axios.request(config)
      let users = response.data
      console.log(JSON.stringify(users))
      let onlines = users.filter((user) => { return user.online === true })
      return onlines
    } catch (error) {
      alert(error)
      setComplete(true)
      return []
    }
  }



  const getUserByDocId = async (id) => {

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${domain}/user/findByDocId?id=${id}`,
      headers: {}
    }

    try {
      const response = await axios.request(config)
      let user = response.data
      console.log(`user by doc id : ${JSON.stringify(user)}`)
      // alert(`user by doc id : ${JSON.stringify(user)}`)
      return user
    } catch (ex) {
      console.log(`ex : ${ex}`)
      return ex
    }
  }


  useEffect(() => {

    const ENDPOINT = domain
    const socket = io(ENDPOINT)

    socket.on('connect', () => {
      console.log(`${socket.id} is connected to socket.io`)
      socket.emit('joined', { userId: appInfo.userInfo.id, userName: appInfo.userInfo.username, profilePicture: appInfo.userInfo.profilePicture })
    })


    socket.on('onlineUsersMongoEvent', async (data) => {
      // if (!complete) {
      // alert(`mongo event : online users : ${JSON.stringify(data)}`)
      let docId = data.documentKey._id
      var user = await getUserByDocId(docId)
      appInfo.onlineUsers.push(user)



      if (!complete) {
        setComplete(true)
        const preOnlines = await getOnlineUsers()
        preOnlines.forEach((user) => { appInfo.onlineUsers.push(user) })
      }

      if (!user.online) {
        // alert(`offline : ${appInfo.onlineUsers.length}`)
        let userIndex = -1
        appInfo.onlineUsers.forEach((listItem, index) => { if (user.id === listItem.id) userIndex = index })
        if (userIndex >= 0) appInfo.onlineUsers.splice(userIndex, 1)
        // alert(`offline : index : ${userIndex} | ${appInfo.onlineUsers.length}`)
      }

      const uniqueList = _.uniqBy(appInfo.onlineUsers, '_id')
      appInfo.onlineUsers = uniqueList
      setAppInfo({ ...appInfo })

    })

    socket.open()


  }, [])


  return (
    <div className="TrendCard">

      <h3> Online Users </h3>

      {appInfo.onlineUsers.length > 0 && appInfo.onlineUsers.map((activeUser, id) => {
        return (
          <div className="trend" key={id}>
            <Row style={Styles.row} >
              <Image style={Styles.image} src={activeUser.profilePicture} roundedCircle />
              <div style={Styles.text} >{activeUser.username}</div>
            </Row>
          </div>
        )
      })}

    </div>
  )
}

export default TrendCard


const Styles = ({
  row: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: '57px',
    height: '35px',
    borderRadius: '50px',
    cursor: 'pointer'
  },
  text: {
    width: '130px',
    font: '12px times new roman',
    cursor: 'pointer'
  }
})