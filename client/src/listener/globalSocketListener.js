import React, { useContext, useEffect } from 'react'
import _ from 'lodash'
import { AppContext } from '../Context'
import { io } from "socket.io-client"
import { toast } from 'react-toastify'
const ENDPOINT = `http://127.0.0.1:5000/`
const socket = io(ENDPOINT);

function GlobalSocketListener({ children }) {

    const { appInfo, setAppInfo } = useContext(AppContext)




    const socketListener = () => {

        socket.on('message', (data) => {
            alert(`global message listener : ${JSON.stringify(data.fullDocument)}`)
            if (data && Object.keys(data).length && !data.fullDocument.liveStreamingKey) {
                alert(`message event`)
                // toast('new message',{position:'bottom-center'})
                // let list = appInfo.messages
                // let nm = data.fullDocument
                // list.push(nm)
                // list = _.uniqBy(list, 'text')
                // // alert(`length prexisting  : ${list.length}`)
                // appInfo.messages = list
                // setAppInfo({ ...appInfo })
            }

            if (data && Object.keys(data).length && data.fullDocument.liveStreamingKey) {
                alert(`live call request : ${data.fullDocument.liveStreamingKey}`)
                toast(data.fullDocument.liveStreamingKey)
                // recieveCall(data.liveStreamingKey)
            }

        })

        socket.on("disconnect", () => { console.log(socket.id) })
    }

    const effect = () => {
        socketListener()
    }

    useEffect(effect, [])


    return (
        <div>
            <div>
                {children}
            </div>
            <div>
                <div style={Styles.card} >

                </div>
            </div>
        </div>
    )
}

export default GlobalSocketListener




const Styles = ({
    card: {
        position: 'absolute',
        bottom: '5px',
        right: '5px',
        width: '300px',
        height: '100px'
    }
})