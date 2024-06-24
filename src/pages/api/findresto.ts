import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {id_resto} = req.body
        // if (dlat) return res.status(200).json(dlat)
        const _id = new ObjectId(id_resto)
        const client = await clientPromise;
        const db = client.db("siar");
        const resto = await db
          .collection("resto")
          .findOne({_id})
          return res.status(200).json(resto)
    } catch (e) {
        console.error(e);
        return res.status(500).json(e)
    }
}