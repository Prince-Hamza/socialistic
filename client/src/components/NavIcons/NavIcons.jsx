import Home from "../../img/home.png"
import Noti from "../../img/noti.png"
import Comment from "../../img/comment.png"
import { UilSetting } from "@iconscout/react-unicons"
import { Link } from "react-router-dom"
import React, { useState, useEffect, useRef } from 'react'
import user01 from '../../img/user01.png'
import setting from '../../img/settings.png'
import inbox from '../../img/envelope.png'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import "./Navicons.css"


const NavIcons = ({ location }) => {

  const user = firebase.auth().currentUser

  const handleLogOut = () => {
    // dispatch(logout());
  }

  const [open, setOpen] = useState(false);
  let menuRef = useRef();


  return (
    <div className="navIcons" style={{ marginRight: '15px' }} >

      <Link to="../home">
        <img src={Home} alt="" />
      </Link>

      <img src={Noti} alt="" />

      <Link to="../chat">
        <img src={Comment} alt="" />
      </Link>

      <div className='menu-container'>

        <div className='menu-trigger' onClick={() => { setOpen(!open) }}>
          <UilSetting style={{ cursor: "pointer", width: "1.6rem", height: "1.6rem" }} />
        </div>


        {/*<div style={Styles.menuBar} >
          <h3> Social Istic </h3>

          </div> */}

        {/* <div className={`dropdown-menu ${'active'}`} >
          <h3>Social Istic<br /><span></span></h3>
          <ul>
            {location !== undefined ? (
              ""
            ) : (
              <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <DropdownItem img={user01} text={"My Profile"} />
              </Link>
            )}
            <DropdownItem img={setting} text={"Setting"} />
            <Link to="../chat">
              <DropdownItem img={inbox} text={"Inbox"} />
            </Link>
            <hr style={{ marginRight: '40px', marginBottom: '15px' }}></hr>
            <button className="button logout-button" onClick={handleLogOut} style={{ marginTop: '-1px' }}>Log Out</button>
          </ul>
        </div> */}


      </div>
    </div>
  );
};

function DropdownItem(props) {
  return (
    <li className='dropdownItem'>
      <img src={props.img} alt=""></img>
      <div> {props.text} </div>
    </li>
  )
}

export default NavIcons



const Styles = ({
  menuBar: {
    position: 'absolute',
    top: '50px',
    right: '2px',
    backgroundColor: '#fff',
    padding: '10px 20px'
  }
})

