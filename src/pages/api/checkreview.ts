import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {id_user, id_resto} = req.body
        // if (dlat) return res.status(200).json(dlat)
        // const _id = new ObjectId(id)
        const client = await clientPromise;
        const db = client.db("siar");
        const hist = await db
          .collection("review")
          .findOne({id_user, id_resto})
        if(hist) return res.status(200).json("sudah")
        else return res.status(200).json("belum")
    } catch (e) {
        console.error(e);
        return res.status(500).json(e)
    }
}