import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom"
import Logo from "../../img/logo_istic.jpg"
import { Image } from 'react-bootstrap';
import "./Navbar.css"
import Home from "../../img/home.png"
import Noti from "../../img/noti.png"
import Comment from "../../img/comment.png"
import Setting from "../../img/settings.png"
function CustomNavbar() {
  return (
    <Container fluid>
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className='NavbarContainer'>
      
        <Navbar.Brand href="#home" className=''>
        <Link to="../home">
          <Image src={Logo} alt="" fluid style={{width:100,height:70}}/>
        </Link>
        <span className='logoSpan'>Social lstic</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            
            
          </Nav>
          <Nav className='gap-4'>
            <Nav.Link href="#deets">
                <Link to="../home">
                      <Image src={Home} alt="" fluid style={{width:25,height:25}}/>
                 </Link>
            </Nav.Link>
            <Nav.Link eventKey={2} >
                      
                       <Image src={Noti} alt="" fluid style={{width:25,height:25}}/>
                       
            </Nav.Link>
            <Nav.Link eventKey={2} >
                        <Link to="../Chats" >
                       <Image src={Comment} alt="" fluid style={{width:25,height:25}}/>
                       </Link>
            </Nav.Link>
            <Nav.Link eventKey={2} >
                       <Image src={Setting} alt="" fluid style={{width:25,height:25}}/>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      
    </Navbar>
   </Container>
  )
}

export default CustomNavbar