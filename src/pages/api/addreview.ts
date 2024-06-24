import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function POST (req: NextApiRequest, res: NextApiResponse) {
  // if (req.method === 'POST'){
    try {
      const client = await clientPromise;
      const db = client.db("siar");
      const {id, id_user, id_resto, nama, email, rating, comment} = req.body
      const _id = new ObjectId(id)
      const user = String(id_user)
      const resto = String(id_resto)
      const rate = Number(rating)
      const comm = String(comment)
      const d = new Date()
      const date = d.getDate()+'/'+(d.getMonth() + 1)+'/'+d.getFullYear()
      try {
        const resp = await db
          .collection("review")
          .insertOne({
            id_user:user,
            id_resto:resto,
            nama: nama,
            email: email,
            rating:rate,
            comment:comm,
            date: date
          })
        const insert = res.status(200).json(resp)
        const upd = await db
          .collection("riwayat_mengunjungi")
          .updateOne({_id},{
            $set : {
              review : "yes"
            }
          })
        const update = res.status(200).json(upd)
        return {insert, update}
      } catch (error) {
        console.log(error)
        return res.status(500).json({error})
      }
      
  
    } catch (e) {
        console.error(e);
    }
  // }
  // else res.status(500).json({error: "error"})
}