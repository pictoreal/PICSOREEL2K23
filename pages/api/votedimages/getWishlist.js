import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("Voting");
    const userid = req.body.user;
    const cat_type = req.body.category;
    const allPosts = await db.collection("Votes").find({voter_id : userid, category : cat_type}).toArray();
    for(let i = 0; i< allPosts.length; i++)
    {
        const resu = await fetch(`http://localhost:3000/api/getimage/${allPosts[i].image_id}`)
        const data = await resu.json()
        console.log(data)
    }
    res.status(200).json(allPosts);
}

//aggregate pipeline for older schema
//db.Votes.aggregate([{$lookup:{from:"Images",let:{image:"$image_id"},pipeline:[{$match:{$expr:{$and:[{$eq:["$image_id", "$$image"]},{$eq:["$category","painting"]}]}}}],as:"votedImages"}}, {$unwind:"$votedImages"}])
