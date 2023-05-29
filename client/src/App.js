import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth/Auth";
import Profile from "./pages/Profile/Profile";
import { useSelector } from "react-redux";
import Chat from "./pages/Chat/Chat";
import UserProfile from "./components/UserProfile/UserProfile";
import { useContext } from "react";
import AuthContext from "./provider/AuthContext";
function App() {
  const user = useSelector((state) => state.authReducer.authData);
  const {login} = useContext(AuthContext) 
  console.log(login)

  if(login === null) return(
    <div>...loading</div>
  )
  else{
    return (
      <div
        className="App"
        style={{
          height:
            window.location.href === "http://localhost:3000/chat"
              ? "calc(100vh - 2rem)"
              : "auto",
        }}>
        
        <div className="blur" style={{ top: "-18%", right: "0" }}></div>
        <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
       
        <Routes>
          
          <Route
            path="/"
            element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
          />
          <Route
            path="/home"
            element={user ? <Home /> : <Navigate to="../auth" />}
          />
          <Route
            path="/auth"
            element={login ? <UserProfile/> : <Auth />}
          />
          <Route
            path="/profile/:id"
            element={user ? <Profile /> : <Navigate to="../auth" />}
          />
          {/*
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          /> */}
  
          <Route
            path="/chat"
            element={user ? <Chat /> : <Navigate to="../auth" />}
          />
        </Routes>
        
      </div>
    );
  }
  
}

export default App;
