import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {idresto} = req.body
        // if (dlat) return res.status(200).json(dlat)
        const id_resto = String(idresto)
        // const _id = new ObjectId(id)
        const client = await clientPromise;
        const db = client.db("siar");
        const review = await db
          .collection("review")
          .find({id_resto})
          .toArray()
          return res.status(200).json(review)
    } catch (e) {
        console.error(e);
        return res.status(500).json(e)
    }
}