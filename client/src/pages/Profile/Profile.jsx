import React from "react"
import PostSide from "../../components/PostSide/PostSide"
import ProfileCard from "../../components/ProfileCard/ProfileCard"
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft"
import RightSide from "../../components/RightSide/RightSide"
import { Row,Col,Container } from "react-bootstrap"

import "./Profile.css"
import CustomNavbar from "../../components/Navbar/Navbar"


const Profile = () => {
  return (
    <div className="Profile">
      <CustomNavbar/>
      <Container fluid >
        <Row>
          <Col><ProfileLeft /></Col>
          <Col>  <div className="Profile-center">
            <ProfileCard location = 'profilePage'/>
            <PostSide/>
            </div>
          </Col>
          <Col>
          <RightSide/>
          </Col>
        </Row>
      </Container>
      
    
     
    </div>
  );
};

export default Profile;
