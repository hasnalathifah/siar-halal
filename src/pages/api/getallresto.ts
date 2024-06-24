import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db("siar");
        const resto = await db
          .collection("resto")
          .find({})
          .sort({_id:1})
          .limit(20)
          .toArray()
        return res.status(200).json(resto)
    } catch (e) {
        console.error(e);
    }
}