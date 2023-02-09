import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("Voting");
    const user = req.body.username
    const cate = req.body.category
    const allPosts = await db.collection("Votes").find({voter_id : user, category : cate}).toArray();
    res.status(200).json(allPosts);
}
