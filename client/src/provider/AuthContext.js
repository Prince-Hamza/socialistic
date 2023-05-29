import React, { createContext ,useEffect, useState} from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const AuthContext =  createContext();


export const AuthContextProvider = ({children}) =>{
    
    const [user,setUser] = useState(null)
    const [login,setLogin] = useState(false)
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setUser(user.displayName)
                setLogin(true)
                
                console.log(user);
            }
            else{
                setLogin(false)
            }
           
            
        })
        

    },[])
   
   
    return(
        <AuthContext.Provider value={{user,login}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext