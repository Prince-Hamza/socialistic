import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppContext } from './Context'
import { useEffect, useState } from 'react'
import { config } from './config'
import Home from './pages/Home'
import Auth from './pages/Auth/Auth'
import Profile from './pages/Profile/Profile'
import Chat from './pages/Chat/Chat'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { webAuth } from './firebase/firebaseAuth'
import axios from 'axios'
import { domain } from './constants/constants'
import GlobalSocketListener from './listener/globalSocketListener'
import { ToastContainer, toast, useToast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loading from './components/Loading/Loading'
import Live from './components/Live/Live'
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
const fireAuth = new webAuth()

function App() {


    const [appData, setAppData] = useState({
        userInfo: {},
        profileUser: {},
        chatHistory: [],
        selectedChatRoom: {},
        messages: [],
        online: true,
        onlineUsers: [],

        postsForPage: 'home',
        myPostsCount: 0,
        postsByFollowedCount: 0,
        updatePostsByFollowed: false,

        chat: true,
        call: false,
        callType: 'recieving',
        buttonsClicked: false,
        listenToMongo: false,
        listening: false,
        abortedByPartner: false,
        chosenChat: false
    })
    const [loading, setLoading] = useState(true)

    if (!firebase.apps.length) firebase.initializeApp(config)
    // var user = firebase.auth().currentUser


    const setOnlineUsers = (list) => {
        alert(`online users : ${list}`)
    }


    const getUserInfoFromMongoDb = (user) => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${domain}/user/${user.uid}`,
            headers: {}
        }

        // alert(`get : ${config.url}`)

        axios.request(config)
            .then((response) => {
                //  alert(JSON.stringify(response.data))
                if (response.data.user) {
                    appData.userInfo = response.data.user
                    setAppData({ ...appData })
                    setLoading(false)
                    // alert(`app data : userInfo : ${JSON.stringify(appData)}`)
                }
            })
            .catch((error) => {
                alert(`user auth error : ${error}`)
            })
    }


    const init = async () => {
        // alert(`App: get session`)
        // get login session 
        const user = await fireAuth.getLoginSession()
        // alert(`user from login session : ${JSON.stringify(user)}`)
        if (user.uid) getUserInfoFromMongoDb(user)
        if (!user.uid) {
            setLoading(false)
            if (`${window.location.protocol}//${window.location.host}/` !== window.location.href) window.location.replace('/')
        }
    }


    const effect = () => {
        init()
    }

    useEffect(effect, [])


    return (
        <AppContext.Provider value={{ appInfo: appData, setAppInfo: setAppData }}>
            <ToastContainer />
            <BrowserRouter>
                {/* <GlobalSocketListener /> */}
                <Routes>
                    <Route
                        path="/"
                        element={loading ? <Loading /> : (appData.userInfo.id ? <Home /> : <Auth />)}
                    />

                    <Route
                        path="/home"
                        element={loading ? <Loading /> : (appData.userInfo.id ? <Home /> : <Auth />)}
                    />

                    <Route
                        path="/auth"
                        element={<Auth />}
                    />

                    <Route
                        path="/profile/:id"
                        element={loading ? <Loading /> : (appData.userInfo.id ? <Profile /> : <Auth />)}
                    />

                    <Route
                        path="/chat"
                        element={loading ? <Loading /> : (appData.userInfo.id ? <Chat /> : <Auth />)}
                    />

                    <Route
                        path="/chat/:id"
                        element={loading ? <Loading /> : (appData.userInfo.id ? <Chat /> : <Auth />)}
                    />

                    <Route
                        path="/live"
                        element={loading ? <Loading /> : (appData.userInfo.id ? <Live /> : <Auth />)}
                    />

                </Routes>
            </BrowserRouter>
        </AppContext.Provider>
    )
}

export default App

