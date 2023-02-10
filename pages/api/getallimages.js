import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("Voting");
    const name = req.query
    const allPosts = await db.collection("Images").find({}).toArray();
    res.status(200).json(allPosts);
}