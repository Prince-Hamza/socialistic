import React, { useState ,useContext} from "react";
import "./Auth.css";
import Logo from "../../img/logo_istic.png";
import { logIn, signUp } from "../../actions/AuthActions.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth,db } from "../../firebase/firebase";
import {  createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "firebase/auth";
import {doc,setDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from "../../provider/AuthContext";

const Auth = () => {
  const {login} = useContext(AuthContext);
  const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpass: "",
  };
  const loading = useSelector((state) => state.authReducer.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(true);

  const [data, setData] = useState(initialState);

  const [confirmPass, setConfirmPass] = useState(true);

  // const dispatch = useDispatch()

  // Reset Form
  const resetForm = () => {
    setData(initialState);
    setConfirmPass(confirmPass);
  };
  
  // handle Change in input
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Form Submission
  const handleSubmit = async (e) => {
    setConfirmPass(true);
    e.preventDefault();
    if (isSignUp) {
        
        if(data.password == data.confirmpass){
          createUserWithEmailAndPassword(auth, data.email, data.password)
          .then(async(userCredential) => {
            
            const user = userCredential.user;
            const userData = {
              firstname : data.firstname,
              lastname  : data.lastname
            }
           
            const ref = doc (db,"users", userCredential.user.uid);
            const docRef = await setDoc(ref,{userData})
              .then((re)=>{
               
                 toast("register successfully",{
                  position:"top-center"
                 });
                 resetForm();
                
                
              })
              .catch((e)=>{
                toast.warn(e.message,{
                  position:"top-center"
                });
                
              })
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
            toast.warn(error.message,{
              position:"top-center"
            });
            // ..
          });
        }
        
     /* data.password === data.confirmpass
        ? dispatch(signUp(data, navigate))
        : setConfirmPass(false); */
      
       
    } else {
      
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          
          
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.warn(errorMessage,{
            position:"top-center"
          });
        });

      /*dispatch(logIn(data, navigate));*/
     
    }
  };

  return (
    <div className="Auth">
      {/* left side */}

      <div className="a-left">
        <img src={Logo} alt="" />

        <div className="Webname">
          <h1>Social lstic</h1>
          <h6>Explore and share more knowledges <br></br>
           through experiences</h6>
        </div>
      </div>

      {/* right form side */}

      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Register" : "Login"}</h3>
          {isSignUp && (
            <div>
              <input
                required
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                value={data.firstname}
                onChange={handleChange}
              />
              <input
                required
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                value={data.lastname}
                onChange={handleChange}
              />
            </div>
          )}

          <div>
            <input
              required
              type="email"
              placeholder="email"
              className="infoInput"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              required
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            {isSignUp && (
              <input
                required
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
            )}
          </div>

          <span
            style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: confirmPass ? "none" : "block",
            }}
          >
            *Confirm password is not same
          </span>
          <div>
            <span
              style={{
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
                color: "green"
              }}
              onClick={() => {
                resetForm();
                setIsSignUp((prev) => !prev);
              }}
            >
              {isSignUp
                ? "Already have an account Login"
                : "Don't have an account Sign up"}
            </span>
            <button
               
              className="button infoButton"
              type="Submit"
              disabled={loading}
            >
              {loading ? "Loading..." : isSignUp ? "SignUp" : "Login"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Auth;
