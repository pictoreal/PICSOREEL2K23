import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("Voting");
    const imgid = req.body.imageid
    const name = req.body.name
    const clas = req.body.class
    const url = req.body.url
    const cat = req.body.category
    const newimage = {
        image_id : imgid,
        vote : 0,
        name : name,
        class : clas,
        url : url,
        category : cat
    }
    const allPosts = await db.collection("Images").insertOne(newimage);
    res.status(201).json(allPosts);
}