import React, { useContext, useState } from 'react'
import './TrendCard.css'
import { AppContext } from '../../Context.js'
import { Image, Row } from 'react-bootstrap'

const TrendCard = () => {

  const { appInfo, setAppInfo } = useContext(AppContext)


  console.log(`trend card : ${JSON.stringify(appInfo.onlineUsers)}`)
  // alert(`trend card : ${JSON.stringify(appInfo.onlineUsers)}`)


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