import Head from 'next/head'
import Link from 'next/link'

export default function Admin() {
  const [user, setUser] = useState('')
  const [isloggedin, setIsLoggedIn] = useState(false)

  useEffect(() => {
    checkifuser()
  }, []);

  const checkifuser = async () => {
    const loggedInUser = localStorage.getItem("user");
    const resh = await fetch(`http://localhost:3000/api/checkadmin/${loggedInUser}`)
    const data = await resh.json()
    if (data) {
      setIsLoggedIn(true)
    }
  }
  return (
    <>
      <Head>
        <title>Voting Page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>This is Votingpage</h1>
        <Link href="/scanner"><button>Scan to vote</button></Link><br></br>
        <Link href="/myvotes"><button>My votes</button></Link>
      </div>
    </>
  )
}