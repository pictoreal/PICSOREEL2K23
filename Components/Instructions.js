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
        const resh = await fetch(`http://localhost:3000/api/checkadmin/${loggedInUser}`)
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
        const res = await fetch(`http://localhost:3000/api/checkadmin/${userid}`)
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
                            <ul>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
                                <br></br>
                                <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
                                <br></br>
                                <li>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</li>
                                <br></br>
                                <li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</li>
                            </ul>
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