import Link from 'next/link';
import Admin from '../pages/login';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import style from '../styles/Index.module.css';
import lstyle from '../styles/Login.module.css';

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
        <Container fluid className={lstyle.mainBody}>
            <Container className={lstyle.contentContainer}>
                <h2 className={lstyle.titleh2}>Instructions</h2>
            </Container>
            <Container className={lstyle.instructionsContainer}>
                <Image src='Instructions.png' className={lstyle.instructionsimg}></Image>
                <h4 className={lstyle.instructionsh4}>
                    <ul>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
                        <br></br>
                        <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
                        <br></br>
                        <li>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</li>
                        <br></br>
                        <li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</li>
                    </ul>
                </h4>
            </Container>
            {
                !isloggedin ?
                    (<Container className={lstyle.loginContainer}>
                        <input type='text' className={lstyle.logintexth3} value={userid} onChange={(e) => setUserId(e.target.value)} placeholder={"Enter Your Registration ID (eg:C2K....)"}></input>
                        <button onClick={() => userlogin(userid)} className={lstyle.button}>LOGIN</button>
                    </Container>)
                    :
                    ("")
            }
        </Container>
    )
}

export default Instructions;