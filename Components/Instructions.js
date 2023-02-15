import Link from 'next/link';
import Admin from '../pages/login';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import style from '../styles/Login.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/Instructions.png';

function Instructions() {
    const router = useRouter()
    const [users, setUsers] = useState([])
    const [userid, setUserId] = useState('')
    const [isloggedin, setIsLoggedIn] = useState(false)

    const checkifuser = async () => {
        const loggedInUser = localStorage.getItem("user");
        const resh = await fetch(`/api/checkadmin/${loggedInUser}`)
        const data = await resh.json()
        if (data.name !== "notuser") {
            setIsLoggedIn(true);
        } else {
            router.push('/login')
        }
    }

    useEffect(() => {
        checkifuser();
    }, []);

    const userlogin = async userid => {
        const s = process.env.BASE_FETCH_URL
        const res = await fetch(`/api/checkadmin/${userid}`)
        const data = await res.json()
        setUsers(data)
        localStorage.setItem('user', data.name)
        if (data.name === "notuser") {
            alert("Please enter a valid user id");
        } else if (data.if_submitted === true) {
            router.push('/myvotes');
        } else {
            router.push('/wishlist');
        }
    }

    return (
        <Container fluid className={style.mainBody}>
            <Container className={style.mainContainer}>
                <Row className={style.titleContainer}>
                    <Col>
                        <h1 className={style.title}>Instructions</h1>
                    </Col>
                </Row>
                <Row className={style.detailContainer}>
                    <Col className={style.imageContainer} xl={4} lg={5} md={6} sm={7} xs={10}>
                        <Image src='Instructions.png' className={style.image}></Image>
                    </Col>
                    <Col className={style.contentContainer} xl={7} lg={7} md={6} sm={12} xs={12}>
                        <Container className={style.instructionContainer}>
                            <ol>
                                <li>Register yourself at the Admin panel.</li>
                                <li>On the Instructions page, enter your registration ID, for example, C2K20106750, as your Login ID.</li>
                                <li>After logging in, you will land on the Wishlist page. Click on the &#10133; to scan the QR code to select the entry.</li>
                                <li>Confirm your choice by clicking on &#9989; .Your vote will be added to the My Wishlist page</li>
                                <li> There are 4 categories to cast your votes in: Paintings/sketches, Photography, Digital art, Theme: <i><b>Slice of life</b></i></li>
                                <li>To delete the entry from your wishlist, click on the &#10062; .</li>
                                <li>Please keep in mind that you can only vote for 2 entries per category at a time, for a total of 8 votes.</li>
                                <li>After selecting 8 entries (2 votes per category), click on the "Final Submit" button to confirm your votes.</li>
                                Note: Your vote will be casted only when you click on the final submit button.
                                Adding items to your wishlist does not mean you have voted!
                                <li>After final submission, kindly fill out the feedback form.</li>
                                <li>You can safely logout.</li>
                                Your votes can be viewed on the "My Votes" pages after final submission.
                                If the image does not load, refresh the page.
                            </ol>
                        </Container>
                        {
                            !isloggedin ?
                                (<Container className={style.loginContainer}>
                                    <h5 className={style.loginTitle}>Enter your Registration ID</h5>
                                    <Container className={style.loginContent}>
                                        <input type='text' className={style.loginText} value={userid} onChange={(e) => setUserId(e.target.value)} placeholder={"C2K21106773"}></input>
                                        <button onClick={() => userlogin(userid)} className={style.button}>LOGIN</button>
                                    </Container>
                                </Container>)
                                :
                                ("")
                        }
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default Instructions;