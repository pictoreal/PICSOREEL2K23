import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("Voting");
    const user = req.body.user
    const newuser = {
        name: user,
        class: "TE6"
    }
    const allPosts = await db.collection("Users").insertOne(newuser);
    res.status(201).json(newuser);
}