import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("Voting");
  console.log(req.body);
  const admin = await db.collection("Users").findOne({ is_admin: true, name: req.body.admin });
  if (admin) {
    const user = req.body.user;
    const newuser = {
      name: user,
      is_admin: false,
      if_submitted: false,
    };
    const allPosts = await db.collection("Users").insertOne(newuser);
    res.status(201).json(allPosts);
  } else {
    res.status(401).json({ msg: "Not Authenticated!" });
  }
}
