import { useContext, useEffect, useState } from 'react'
import { main } from './backend'
import { addMessage, getMessages } from "../../api/MessageRequests"
import { AppContext } from '../../Context'
import { useNavigate } from 'react-router-dom'
import { io } from "socket.io-client"
import { domain } from '../../constants/constants'
import './App.css'
const ENDPOINT = domain
const socket = io(ENDPOINT)


function Live() {

    const { appInfo, setAppInfo } = useContext(AppContext)

    const navigate = useNavigate()

    const socketListener = () => {
        socket.on('message', (data) => {
            let message = data.fullDocument
            console.log(`abort message tracked in Live.jsx: ${message.text}, full :  ${JSON.stringify(message)}`)
            // alert(`abort message tracked in Live.jsx: ${message.text}, full :  ${JSON.stringify(message)}`)
            let hangup = document.getElementById('hangupButton')
            if (hangup && message && message.text === '${{abort call}}') {
                appInfo.abortedByPartner = true
                setTimeout(() => {
                    setAppInfo({ ...appInfo })
                    console.log('click hangup')
                    hangup.click()
                }, 3000)
            }
        })
    }

    const notify = async (streamKey) => {

        const message = {
            chatRoomKey: appInfo.selectedChatRoom.key,
            messageId: Math.random().toString(),
            myId: appInfo.userInfo.id,
            partnerId: appInfo.selectedChatRoom.partner.id,
            text: 'call Request',
            liveStreamingKey: streamKey
        }

        try {
            await addMessage(message)
        }
        catch (ex) {
            console.log(`error : ${ex}`)
        }

    }

    const automateSendCall = () => {
        if (!appInfo.buttonsClicked) {
            appInfo.buttonsClicked = true
            setTimeout(() => {
                setAppInfo({ ...appInfo })
                document.getElementById('webcamButton').click()
            }, 2000)

            setTimeout(() => {
                if (appInfo.callType === 'sending') {
                    var callBtn = document.getElementById('callButton')
                    callBtn.click()
                }
            }, 5000)
        }

    }


    const automateRecieveCall = () => {
        setTimeout(() => {
            setAppInfo({ ...appInfo })
            document.getElementById('webcamButton').click()
        }, 2000)

        setTimeout(() => {
            document.getElementById('callInput').value = appInfo.liveStreamingKey
        }, 3000)

        setTimeout(() => {
            document.getElementById('answerButton').click()
        }, 6000)

    }

    const effect = () => {
        socketListener()
        main(notify, appInfo, setAppInfo, navigate)
        if (appInfo.callType === 'sending') automateSendCall()
        if (appInfo.callType === 'recieving') automateRecieveCall()
    }

    useEffect(effect, [])

    return (
        <div className="App">

            {/* <div style={{ font: "bold 18px roboto" }}> Start your Webcam</div> */}

            <br />

            <div>
                <div>
                    {/* <div style={{ font: "bold 14px roboto" }}>Local Stream</div> */}
                    <video id="webcamVideo" autoPlay playsInline></video>
                </div>
                <br />

                <div>
                    {/* <div style={{ font: "bold 14px roboto" }}>Remote Stream</div> */}
                    <video id="remoteVideo" autoPlay playsInline></video>
                </div>
            </div>

            <button style={Styles.Button} id="webcamButton">Start webcam</button>
            <br />
            <br />
            <br />

            <button style={Styles.Button} id="callButton">Create Call (offer)</button>


            {/* <div style={{ font: "18px roboto" }}>
                OR
            </div>

            <h6>Join a Call</h6> */}



            <input style={{ display: 'none' }} id="callInput" placeholder='livestream id' />
            <br />
            <br />

            <button style={Styles.Button} id="answerButton" >Answer</button>

            <br />
            <br />
            <br />
            <br />
            {/* <div style={Styles.smallText}> Abort Live stream</div> */}

            <br />

            <button style={Styles.abortButton} id="hangupButton" >Hangup</button>


        </div >
    );
}

export default Live

const Styles = ({
    Button: {
        font: "14px roboto",
        width: '140px',
        height: '50px',
        backgroundColor: '#2c3e50',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        display: 'none'
    },
    abortButton: {
        font: "14px roboto",
        width: '140px',
        height: '50px',
        backgroundColor: '#2c3e50',
        border: 'none',
        color: 'white',
        cursor: 'pointer'
    },
    bigText: {
        font: "14px roboto"
    },
    smallText: {
        font: "18px roboto"
    }
})