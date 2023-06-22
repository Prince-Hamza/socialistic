import React, { useContext, useState } from 'react'
import './TrendCard.css'
import { AppContext } from '../../Context.js'

const TrendCard = () => {

  const { appInfo, setAppInfo } = useContext(AppContext)

  return (
    <div className="TrendCard">
      <h3> Online Users </h3>
      {/* {TrendData.map((trend, id) => {
        return (
          <div className="trend" key={id}>
            <span>#{trend.name}</span>
            <span>{trend.shares} shares</span>
            <span>{trend.likes} likes</span>
          </div>
        );
      })} */}

      {appInfo.onlineUsers.length > 0 && appInfo.onlineUsers.map((activeUser, id) => {
        return (
          <div className="trend" key={id}>
            <span>#{activeUser.userId}</span>

          </div>
        )
      })}

    </div>
  )
}

export default TrendCard