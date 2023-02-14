import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("Voting");
    const admin = await db.collection("Users").findOne({ is_admin: true, name: req.body.admin });
    if (admin) {
        const user = req.body.name;
        const allPosts = await db.collection("Users").deleteOne({ name: user });
        res.status(201).json(allPosts);
    } else {
        res.status(401).json({ msg: "Not Authenticated!" });
    }
}
