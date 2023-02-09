import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("Voting");
    const allPosts = await db.collection("Users").find({}).toArray();
    res.status(200).json(allPosts);
}