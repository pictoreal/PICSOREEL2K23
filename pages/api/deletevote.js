import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("Voting");
    const user = req.body.voter_id
    const imageid = req.body.image_id
    const cate = req.body.category
    const oldVote = {
        voter_id : user,
        image_id : imageid,
        category : cate,
    }
    const allPosts = await db.collection("Votes").deleteMany(oldVote);
    res.status(201).json(allPosts);
}