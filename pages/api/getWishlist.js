import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("Voting");
    const user = req.body.username
    const cate = req.body.category
    const allPosts = await db.collection("Votes").find({voter_id : user, category : cate}).toArray();
    const tp = []
    // console.log(allPosts)
    for(let i = 0; i< allPosts.length; i++)
    {
        const res = await fetch(`https://picsoreel.pictoreal.in/api/getimage/${allPosts[i].image_id}`)
        const data = await res.json()
        tp.push(data[0])
    }
    res.json(tp);
}


//aggregate pipeline for older schema
//db.Votes.aggregate([{$lookup:{from:"Images",let:{image:"$image_id"},pipeline:[{$match:{$expr:{$and:[{$eq:["$image_id", "$$image"]},{$eq:["$category","painting"]}]}}}],as:"votedImages"}}, {$unwind:"$votedImages"}])
