import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function uploadimages() {
    const [user, setUser] = useState('')
    const [name, setName] = useState('')
    const [clas, setClas] = useState('')
    const [url, setURL] = useState('')
    const [cat, setCat] = useState('')
    const [images, setImages] = useState([])
    const loadimags = async () => {
        const res = await fetch('http://localhost:3000/api/getallimages')
        const data = await res.json()
        setImages(data)
    }
    const submitentry = async () => {
        const s = process.env.BASE_FETCH_URL
        const res = await fetch('http://localhost:3000/api/submitentry', {
            method: 'POST',
            body: JSON.stringify({ imageid: user, name: name, class: clas, url: url, category: cat }),
            headers: {
                'Content-Type': 'application/JSON'
            }
        })
        const data = await res.json()
        alert(data.acknowledged)
    }
    return (
        <>
            <Head>
                <title>Image Upload page</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                Image_id : <input type='text' value={user} onChange={(e) => setUser(e.target.value)}></input><br></br>
                Name : <input type='text' value={name} onChange={(e) => setName(e.target.value)}></input><br></br>
                Class : <input type='text' value={clas} onChange={(e) => setClas(e.target.value)}></input><br></br>
                URL : <input type='text' value={url} onChange={(e) => setURL(e.target.value)}></input><br></br>
                Category : <input type='text' value={cat} onChange={(e) => setCat(e.target.value)}></input><br></br>
                <button onClick={() => submitentry()}>Submit</button>
            </div>
            <button onClick={() => loadimags()}>Load Images</button>
            {
                images.map((image) => {
                    return (
                        <>
                            <div key={image.image_id}>
                                {image.image_id} | {image.category} | {image.name} | {image.class}
                            </div>
                        </>
                    )
                })
            }
        </>
    )
}
