import style from '../styles/NavigationBar.module.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState, useEffect } from "react";
import {useRouter} from 'next/router'
import 'bootstrap/dist/css/bootstrap.min.css';

function NavigationBar(){
    const router = useRouter()
    const [data, setData] = useState("No result");
    const [isloggedin, setIsLoggedIn] = useState(false)
  
    const checkifuser = async () => {
        const loggedInUser = localStorage.getItem("user");
        const resh = await fetch(`http://localhost:3000/api/checkadmin/${loggedInUser}`)
        const data = await resh.json()
        if (data.name !== "notuser") {
            setIsLoggedIn(true);
            setData(null);
        } else{
            router.push('/login')
        }
    }

    useEffect(() => {
        checkifuser();
    }, []);

    const logout = async name => {
        const loggedInUser = localStorage.removeItem('user');
    }

    return (
        <Navbar fixed="top" expand="lg" className={style.navContainer}>
        <Container>
            <Navbar.Brand href="#home" className={style.navLogoTitle}>Pics-o-reel</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
            {
                isloggedin ?
                (<Nav className="justify-content-end">
                    <Nav.Link href="/wishlist" className={style.navTitle}>My Wishlist</Nav.Link>
                    <Nav.Link href="/login" className={style.navTitle}>Instructions</Nav.Link>
                    <Nav.Link href="/"><button className={style.button} onClick={logout}>Logout</button></Nav.Link>
                </Nav>)
                    :
                ("")
            }
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

export default NavigationBar;