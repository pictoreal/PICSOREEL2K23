import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("Voting");
    const name = req.query
    var tp = name.image_id
    var imgid = tp.split(',')[0]
    var usrid = tp.split(',')[1]
    const allPosts = await db.collection("Votes").find({voter_id:usrid, image_id:usrid}).toArray();
    res.status(200).json(allPosts[0]);
}