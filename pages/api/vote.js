import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("Voting");
    const myuserid = "c2k20106472";
    const imgid = "p11006"
    const myuser = await db.collection("Users").find({name : myuserid}).toArray();
    const ifsubmit = myuser[0].if_submitted

    // ifsubmit : User has already voted modal
    
    let flag = false;
    if(!ifsubmit)
    {
        const voter = await db.collection("Votes").find({voter_id : myuserid}).toArray();
        let local_id;
        let paint_cnt = 0;
        let sketch_cnt = 0;
        let photo_cnt = 0;
        for(let i = 0; i < voter.length; i++)
        {
            local_id = voter[i].image_id
            if(local_id.slice(0,2)==="ph")
            {
                photo_cnt++;
            }
            else if(local_id.slice(0,2)==="pt")
            {
                paint_cnt++;
            }
            else if(local_id.slice(0,2)==="st")
            {
                sketch_cnt++;
            }

            //else error insertion
            
            if(local_id === imgid)
            {
                flag = true;
                break;
            }
        }
    }
    var possible_to_vote = true;
    if(imgid.slice(0,2)==="ph" && photo_cnt===3)
    {
        possible_to_vote = false;
    }
    if(imgid.slice(0,2)==="pt" && paint_cnt===3)
    {
        possible_to_vote = false;
    }
    if(imgid.slice(0,2)==="st" && sketch_cnt===3)
    {
        possible_to_vote = false;
    }

    // if flag is set true... repetative voting

    if(!flag && !ifsubmit && possible_to_vote)
    {
        const voteit = await db.collection("Votes").insertOne({voter_id : myuserid, image_id : imgid});
    }
    res.status(201).json(myuser);
}