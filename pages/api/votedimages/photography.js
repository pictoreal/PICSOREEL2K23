import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("Voting");
    const userid = "c2k20106472";
    const allPosts = await db.collection("Votes").find({voter_id : userid}).toArray();
    for(let i = 0; i< allPosts.length; i++)
    {
        const resu = await fetch(`http://localhost:3000/api/getimage/${allPosts[i].image_id}`)
        const data = await resu.json()
        console.log(data)
    }
    res.status(200).json(allPosts);
}