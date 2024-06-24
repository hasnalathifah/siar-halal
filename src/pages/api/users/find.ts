import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const id = req.body
        const _id = new ObjectId(id)
        const client = await clientPromise;
        const db = client.db("siar");
        const user = await db
          .collection("user")
          .findOne({_id})
          return res.status(200).json(user)
    } catch (e) {
        console.error(e);
        return res.status(500).json(e)
    }
}