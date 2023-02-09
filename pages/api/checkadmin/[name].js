import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("Voting");
    const name = req.query
    const allPosts = await db.collection("Users").findOne(name);
    if(allPosts === null)
    {
        res.status(200).json({'is_admin':false, 'name': "notuser"})
    }
    else
    {
        res.status(200).json(allPosts);
    }
}