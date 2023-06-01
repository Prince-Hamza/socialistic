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


function App() {
    const [appData, setAppData] = useState({ userInfo: {}, groups: [], selectedGroup: {}, sideBarExpanded: true })
    if (!firebase.apps.length) firebase.initializeApp(config)
    var user = firebase.auth().currentUser

    return (
        <AppContext.Provider value={{ appInfo: appData, setAppInfo: setAppData }}>
            <BrowserRouter>
                <Routes>

                    <Route
                        path="/"
                        element={user ? <Home /> : <Auth />}
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
        </AppContext.Provider>
    )
}

export default App

