import React, { useContext, useEffect, useState } from 'react'
import _ from 'lodash'
import { AppContext } from '../Context'
import { io } from "socket.io-client"
import { useNavigate } from 'react-router-dom'
import { Button, Row } from 'react-bootstrap'
import { domain } from '../constants/constants'
const ENDPOINT = domain
const socket = io(ENDPOINT);

function GlobalSocketListener({ children }) {

    const { appInfo, setAppInfo } = useContext(AppContext)
    const navigate = useNavigate()
    const [notificationData, setNotificationData] = useState()


    const hideNotification = () => {
        setTimeout(() => {
            setNotificationData()
        }, 2000)
    }

    const updateAppState = (user) => {
        console.log(`notify:update state: ${JSON.stringify(notificationData)}`)
        appInfo.call = user.liveStreamingKey ? true : false
        appInfo.chat = user.liveStreamingKey ? false : true
        appInfo.callType = 'recieving'
        appInfo.liveStreamingKey = user.liveStreamingKey
        setAppInfo({ ...appInfo })
    }

    const socketListener = () => {

        // alert('socket listener')

        socket.on('message', (data) => {

            // alert(`global message listener : ${JSON.stringify(data.fullDocument)}`)

            var user = data.fullDocument
            if (data && Object.keys(data).length && !user.liveStreamingKey) {
                //alert('notify')
                if (!window.location.href.includes('chat')) setNotificationData({ prompt: `A user sent you a message`, ...user })
                // hideNotification()
                // updateAppState(user)
            }

            if (data && Object.keys(data).length && data.fullDocument.liveStreamingKey) {
                setNotificationData({ prompt: `A user is calling you`, ...user })
                // hideNotification()
            }

        })

        socket.on("disconnect", () => { console.log(socket.id) })
    }



    const onAttend = () => {
        updateAppState(notificationData)
        // navigate(`/chat/${notificationData.myId}`)
        navigate(`/live`)
    }


    const onReject = () => {
        hideNotification()
    }


    const effect = () => {
        socketListener()
    }

    useEffect(effect, [])



    return (
        <div>
            <div>
                {notificationData &&
                    <div style={Styles.card}>
                        <Row>
                            <p style={{ color: '#222', font: '16px poppins' }} > {notificationData.prompt} </p>
                            <Button onClick={onAttend} > Attend </Button>
                            <Button onClick={onReject} > Reject </Button>
                        </Row>
                    </div>
                }
            </div>
        </div>
    )
}

export default GlobalSocketListener




const Styles = ({
    card: {
        position: 'absolute',
        bottom: '50px',
        right: '50px',
        width: '300px',
        height: '100px',
        boxShadow: '0px 0px 8px 1px black',
        backgroundColor: 'white'
    }
})