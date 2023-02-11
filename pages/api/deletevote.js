import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("Voting");
    const user = req.body.username
    const imageid = req.body.image_id
    const oldVote = {
        voter_id : user,
        image_id : imageid,
    }
    const allPosts = await db.collection("Votes").deleteOne(oldVote);
    res.status(201).json(allPosts);
}