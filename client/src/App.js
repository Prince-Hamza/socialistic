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
import { domain } from './constants/constants'
import axios from 'axios'

function App() {

    const [appData, setAppData] = useState({ userInfo: {}, chatHistory: [], selectedChatRoom: {} })
    const [loading, setLoading] = useState(true)

    if (!firebase.apps.length) firebase.initializeApp(config)
    // var user = firebase.auth().currentUser


    // const init = async () => {

    //     let config = {
    //         method: 'get',
    //         maxBodyLength: Infinity,
    //         url: `${domain}/user/${user.uid}`,
    //         headers: {}
    //     }

    //     axios.request(config)
    //         .then((response) => {
    //             console.log(JSON.stringify(response.data))
    //             if (response.data.user) {
    //                 appData.userInfo = response.data.user
    //                 setAppData({ ...appData })
    //                 setLoading(false)
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }


    // const effect = () => {
    //     if (user) init()
    //     if (!user) setLoading(false)
    // }

    // useEffect(effect, [])


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

