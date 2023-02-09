import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("Voting");
    const name = req.query
    var tp = name.image_id
    var imgid = tp.split(',')[0]
    var usrid = tp.split(',')[1]
    const imgedetails = await db.collection("Images").find({image_id : imgid}).toArray();
    var cat = imgedetails[0].category
    const allPosts = await db.collection("Votes").insertOne({ voter_id : usrid, image_id : imgid, category : cat});
    res.status(200).json(allPosts);
    // console.log(allPosts)
}