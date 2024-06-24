import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {id, idrest, resto} = req.body
        // if (dlat) return res.status(200).json(dlat)
        const id_user = String(id)
        const id_resto = String(idrest)
        const nama_resto = String(resto)
        // const _id = new ObjectId(id)
        const d = new Date()
        const date = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear()
        const client = await clientPromise;
        const db = client.db("siar");
        const history = await db
          .collection("riwayat_mengunjungi")
          .findOne({id_user,id_resto,date})
          if(!history) {
            await db
              .collection("riwayat_mengunjungi")
              .insertOne({
                id_user: id_user,
                id_resto: id_resto,
                nama_resto: nama_resto,
                date: date
              })
            return res.status(200).json("kosong")
          }
          else return res.status(200).json("ada")
    } catch (e) {
        console.error(e);
        return res.status(500).json(e)
    }
}