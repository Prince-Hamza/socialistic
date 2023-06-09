import React, { useContext, useEffect, useState } from 'react'
import _ from 'lodash'
import { AppContext } from '../Context'
import { io } from "socket.io-client"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Row } from 'react-bootstrap'
const ENDPOINT = `http://127.0.0.1:5000/`
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
        appInfo.call = user.liveStreamingKey ? true : false
        appInfo.chat = user.liveStreamingKey ? false : true
        appInfo.callType = 'recieving'
        appInfo.liveStreamingKey = user.liveStreamingKey
        setAppInfo({ ...appInfo })

    }

    const socketListener = () => {

        socket.on('message', (data) => {


            alert(`global message listener : ${JSON.stringify(data.fullDocument)}`)

            var user = data.fullDocument
            if (data && Object.keys(data).length && !user.liveStreamingKey) {
                alert('notify')
                setNotificationData({ prompt: `A user sent you a message`, ...user })
                //     hideNotification()
                updateAppState(user)
            }

            if (data && Object.keys(data).length && data.fullDocument.liveStreamingKey) {
                alert('notify')
                setNotificationData({ prompt: `A user is calling you`, ...user })
                // hideNotification()
                updateAppState(user)
            }

        })

        socket.on("disconnect", () => { console.log(socket.id) })
    }



    const onNotificationClick = () => {
        setAppInfo({ ...appInfo })
        navigate('/chat')
    }

    const effect = () => {
        socketListener()
    }

    useEffect(effect, [])


    if (notificationData) alert(notificationData.prompt)

    return (
        <div>
            <div>
                {notificationData &&
                    <div style={Styles.card} onClick={onNotificationClick}>
                        <Row>
                            <p style={{ color: '#222', font: '16px poppins' }} >{notificationData.prompt} </p>
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