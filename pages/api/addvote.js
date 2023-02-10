import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("Voting");
    const user = req.body.voter_id
    const imageid = req.body.image_id
    const cate = req.body.category
    const newVote = {
        voter_id: user,
        image_id: imageid,
        category: cate,
    }
    const inter = await db.collection("Votes").find({ voter_id: user, category: cate }).toArray();
    if (inter.length < 2) {
        const allPosts = await db.collection("Votes").insertOne(newVote);
        res.status(201).json(allPosts);
    }
    else {
        res.status(500).json({ msg: "2 votes already casted" });
    }
}