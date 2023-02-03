import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
type Data = {
  name : String
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = await clientPromise;
  const db = client.db("Voting");
  // switch (req.method) {
  //   case "POST":
  //     let bodyObject = JSON.parse(req.body);
      // let myPost = await db.collection("Users").insertOne({name:"Avishkar"});
      // res.json(myPost);
  //     break;
  //   case "GET":
      const allPosts = await db.collection("Users").find({}).toArray();
      res.json({ status: 200, data: allPosts });
      // break;
  // }
}