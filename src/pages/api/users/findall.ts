import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const email = "hasna.lathifah394@gmail.com"
        const client = await clientPromise;
        const db = client.db("siar");
        const user = await db
          .collection("user")
          .find({})
          .sort({gamification:-1})
          .toArray()
          res.status(200).json(user)
    } catch (e) {
        console.error(e);
    }
}