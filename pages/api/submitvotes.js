import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("Voting");
    const name = req.body.username;
    const user = await db.collection("Users").find({name:name}).toArray();
    if(user[0].if_submitted === false){
        const allPosts = await db.collection("Votes").find({voter_id:name}).toArray();
        for( let i = 0; i < allPosts.length; i++){
            const res = await fetch(`https://hostpicsoreel-git-tatpurti-a2k007.vercel.app/api/getimage/${allPosts[i].image_id}`)
            const data = await res.json()
            const newvotes = data[0].vote + 1;
            await db.collection("Images").updateOne({image_id: allPosts[i].image_id}, {$set: {vote: newvotes}});
        }
        //set if_submitted flag to true
        const updatedUser = await db.collection("Users").updateOne({name: req.body.username}, {$set: {if_submitted: true}});
    } else{
        res.status(201).json("You have already submitted your votes!");
    }
    res.status(200).json("Your votes have been submitted!");
}