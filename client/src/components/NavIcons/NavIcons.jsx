//import React, { useState } from "react";
import "./Navicons.css";
import { logout } from "../../actions/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import React, {useState, useEffect, useRef} from 'react';
import user01 from '../../img/user01.png';
import setting from '../../img/settings.png';
import inbox from '../../img/envelope.png';
//import Logout from '../../img/log-out.png';




const NavIcons = ({location}) => {

  const { user } = useSelector((state) => state.authReducer.authData);

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
  }

  const [open, setOpen] = useState(false);
  let menuRef = useRef();

  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
      }      
    };
    document.addEventListener("mousedown", handler);
    return() =>{
      document.removeEventListener("mousedown", handler);
    }
  });

  return (
    <div className="navIcons">
      <Link to="../home">
        <img src={Home} alt="" />
      </Link>
      <img src={Noti} alt="" />
      <Link to="../chat">
        <img src={Comment} alt="" />
      </Link>
      <div className='menu-container' ref={menuRef}>
        <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
          <UilSetting
            style={{
              cursor: "pointer",
              width: "1.6rem",
              height: "1.6rem",
            }}
          />
        </div>
        <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
          <h3>Social Istic<br/><span></span></h3>
          <ul>
            {location === "profilePage" ? (
            ""
            ) : (
            <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <DropdownItem img = {user01} text = {"My Profile"}/>
            </Link>
            )}
            <DropdownItem img = {setting} text = {"Setting"}/>
            <Link to="../chat">
              <DropdownItem img = {inbox} text = {"Inbox"}/>
            </Link>
            <hr style={{marginRight: '40px', marginBottom: '15px'}}></hr>
            {/*isAuthenticated && (*/
            <button className="button logout-button" onClick={handleLogOut} style={{marginTop: '-1px'}}>Log Out</button>             
            /*)*/}
          </ul>
        </div>
      </div>
    </div>
  );
};

function DropdownItem(props){
  return(
    <li className = 'dropdownItem'>
      <img src={props.img} alt=""></img>
      <a> {props.text} </a>
    </li>
  );
}

export default NavIcons;
