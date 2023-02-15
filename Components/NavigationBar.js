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
    const [ifsubmitted, setIfSubmitted] = useState(false)
    const checkifuser = async () => {
        const loggedInUser = localStorage.getItem("user");
        const resh = await fetch(`/api/checkadmin/${loggedInUser}`)
        const data = await resh.json()
        if (data.name !== "notuser") {
            setIsLoggedIn(true);
            setData(null);
            if(data.if_submitted === true)
            {
                setIfSubmitted(true)
            }
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
            <Navbar.Brand href="/" className={style.navLogoTitle}>Pics-o-reel</Navbar.Brand>
            {
                isloggedin ?
                (
                    <>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                            <Nav className="justify-content-end">
                                {
                                    ifsubmitted ?
                                    (
                                        <Nav.Link href="/myvotes" className={style.navTitle}>My Votes</Nav.Link>
                                    )
                                    :
                                    (
                                        <Nav.Link href="/wishlist" className={style.navTitle}>My Wishlist</Nav.Link>
                                    )
                                }
                                <Nav.Link href="/login" className={style.navTitle}>Instructions</Nav.Link>
                                <Nav.Link href="/"><button className={style.button} onClick={logout}>Logout</button></Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </>
                )
                    :
                (
                    ("")
                )
            }
        </Container>
        </Navbar>
    )
}

export default NavigationBar;