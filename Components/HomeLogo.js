import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image'
import '../public/pictorealLogo.png'
import '../public/pictoreal25YearLogo.png'
import style from '../styles/Index.module.css';

function HomeLogo(){
    return(
        <Stack direction="horizontal" gap={3}>
           <Image src='pictorealLogo.png' className={style.logo}></Image> 
           <Image src='pictoreal25YearLogo.png' className={style.logo}></Image> 
        </Stack>
    )
}

export default HomeLogo;