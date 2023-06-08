import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppContext } from './Context'
import { useEffect, useState } from 'react'
import { config } from './config'
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import Home from './pages/Home'
import Auth from './pages/Auth/Auth'
import Profile from './pages/Profile/Profile'
import Chat from './pages/Chat/Chat'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { webAuth } from './firebase/firebaseAuth'
import axios from 'axios'
import { domain } from './constants/constants'
const fireAuth = new webAuth()

function App() {

    const [appData, setAppData] = useState({ userInfo: {}, profileUser: {}, chatHistory: [], selectedChatRoom: {}, messages: [], online: true })
    const [loading, setLoading] = useState(true)

    if (!firebase.apps.length) firebase.initializeApp(config)
    // var user = firebase.auth().currentUser

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
                // alert(JSON.stringify(response.data))
                if (response.data.user) {
                    appData.userInfo = response.data.user
                    setAppData({ ...appData })
                    // alert(`app data : userInfo : ${JSON.stringify(appData)}`)
                }
            })
            .catch((error) => {
                alert(`user auth error : ${error}`)
            })
    }


    const init = async () => {
        // get login session 
        const user = await fireAuth.getLoginSession()
        // alert(`user from login session : ${JSON.stringify(user)}`)
        if (user.uid) getUserInfoFromMongoDb(user)
    }


    const effect = () => {
        if (Object.keys(appData.userInfo).length <= 0) init()
        // if (!user) setLoading(false)
    }

    useEffect(effect, [])


    return (
        <AppContext.Provider value={{ appInfo: appData, setAppInfo: setAppData }}>
            <BrowserRouter>
                <Routes>

                    <Route
                        path="/"
                        element={appData.userInfo.id ? <Home /> : <Auth />}
                    />

                    <Route
                        path="/home"
                        element={<Home />}
                    />

                    <Route
                        path="/auth"
                        element={<Auth />}
                    />
                    <Route
                        path="/profile/:id"
                        element={<Profile />}
                    />

                    <Route
                        path="/chat"
                        element={<Chat />}
                    />

                </Routes>
            </BrowserRouter>

            {/* {loading && <p style={{ color: 'white', font: '26px times new roman', textAlign: 'center' }} > Page you requested cannot be found  </p>} */}

        </AppContext.Provider>
    )
}

export default App

