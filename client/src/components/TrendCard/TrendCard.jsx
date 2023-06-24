import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../Context.js'
import { Image, Row } from 'react-bootstrap'
import axios from 'axios'
import { domain } from '../../constants/constants'
import './TrendCard.css'


const TrendCard = () => {

  const { appInfo, setAppInfo } = useContext(AppContext)
  const [complete, setComplete] = useState(false)


  const getOnlineUsers = () => {

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${domain}/user`,
      headers: {}
    };

    axios.request(config)
      .then((response) => {
        let users = response.data
        setComplete(true)
        console.log(JSON.stringify(users))
        let onlines = users.filter((user) => { return user.online === true })
        onlines.forEach((item) => { appInfo.onlineUsers.push(item) })
        setAppInfo({ ...appInfo })

      })
      .catch((error) => {
        alert(error)
        setComplete(true)
      })
  }

  useEffect(() => {
    //alert(`update : ${JSON.stringify()}`)
    if (!complete) getOnlineUsers()
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