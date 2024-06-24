import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {reslat, reslon} = req.body
        // if (dlat) return res.status(200).json(dlat)
        const lat = Number(reslat)
        const lon = Number(reslon)
        // const _id = new ObjectId(id)
        const client = await clientPromise;
        const db = client.db("siar");
        const user = await db
          .collection("resto")
          .find({lat,lon})
          .project({_id: 1, nama_resto:1})
          .toArray()
          return res.status(200).json(user)
    } catch (e) {
        console.error(e);
        return res.status(500).json(e)
    }
}