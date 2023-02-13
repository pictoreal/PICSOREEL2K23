import Link from 'next/link';
import Admin from '../pages/login';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import style from '../styles/Index.module.css';
import lstyle from '../styles/Login.module.css';

function Instructions(){
    const [userid, setUserId] = useState('')
    return(
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
            <Container className={lstyle.loginContainer}>
                <input type='text' className={lstyle.logintexth3} value={userid} onChange={(e) => setUserId(e.target.value)} placeholder={"Enter Your Registration ID (eg:C2K....)"}></input>
                <Link href='/wishlist'>
                    <button onClick={() => userlogin(userid)} className={lstyle.button}>LOGIN</button>
                </Link>
            </Container>
        </Container>
    )
}

export default Instructions;