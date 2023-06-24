import React, { useContext, useEffect, useState } from 'react'
import _ from 'lodash'
import { AppContext } from '../Context'
import { io } from "socket.io-client"
import { useNavigate } from 'react-router-dom'
import { Button, Col, Row } from 'react-bootstrap'
import { domain } from '../constants/constants'
import { addMessage } from '../api/MessageRequests'
const ENDPOINT = domain
const socket = io(ENDPOINT);

function GlobalSocketListener() {

    const { appInfo, setAppInfo } = useContext(AppContext)
    const navigate = useNavigate()
    const [notificationData, setNotificationData] = useState()


    const hideNotification = () => {
        setTimeout(() => {
            setNotificationData()
        }, 2000)
    }

    const updateAppState = () => {
        console.log(`notify:update state: ${JSON.stringify(notificationData)}`)
        appInfo.call = notificationData.liveStreamingKey ? true : false
        appInfo.chat = notificationData.liveStreamingKey ? false : true
        appInfo.callType = 'recieving'
        appInfo.liveStreamingKey = notificationData.liveStreamingKey
        appInfo.selectedChatRoom.key = notificationData.chatRoomKey
        appInfo.selectedChatRoom.partner = {}
        appInfo.selectedChatRoom.partner.id = notificationData.partnerId
        appInfo.streamingData = notificationData
        // alert(`update : live : ${notificationData.liveStreamingKey}, key: ${notificationData.chatRoomKey} | ${JSON.stringify(notificationData)}`)
        setAppInfo({ ...appInfo })
    }

    const socketListener = () => {

        // alert('socket listener')

        socket.on('message', (data) => {

            // alert(`global message listener : ${JSON.stringify(data.fullDocument)}`)

            var user = data.fullDocument
            if (data && Object.keys(data).length && !user.liveStreamingKey) {
                //alert('notify')
                if (!window.location.href.includes('chat')) setNotificationData({ prompt: `A user sent you a message`, type: 'message', ...user })
                // hideNotification()
                // updateAppState(user)
            }

            if (data && Object.keys(data).length && data.fullDocument.liveStreamingKey) {
                setNotificationData({ prompt: `A user is calling you`, type: 'call', ...user })
                // hideNotification()
            }

        })

        socket.on("disconnect", () => { console.log(socket.id) })
    }


    const onMessage = () => {
        if (notificationData.type === 'message') navigate(`/chat/${notificationData.chatRoomKey}`)
    }
    const onAttend = () => {
        updateAppState()
        navigate(`/live`)
    }


    const onReject = async () => {
        // addMessage
        let message = { ...notificationData, text: '${{abort call}}', abort: true }
        alert(`abort message : ${JSON.stringify(message)}`)
        await addMessage(message)
     //   hideNotification()
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
                        <Col>
                            <p style={{ color: '#222', font: '16px times new roman' }} onClick={onMessage} > {notificationData.prompt} </p>
                            {notificationData.type === 'call' &&
                                <Row>
                                    <Button onClick={onAttend} > Attend </Button>
                                    <Button onClick={onReject} > Reject </Button>
                                </Row>
                            }
                        </Col>
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
    },
    button: {
        borderRadius: '50px',
        width: '40px',
        height: '40px'
    }
})