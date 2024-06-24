import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { ObjectId } from "mongodb";

export default async function POST (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST'){
    try {
      const client = await clientPromise;
      const db = client.db("siar");
      const reqBody = req.body
      const {id, nama, email, pwd} = reqBody
      if (nama == null) return res.status(200).json({error: "kosong"})
      // const email = "hasna.lathifah03@gmail.com"
      // const password = "abcdefg"
      const _id = new ObjectId(id)
      const salt = await bcryptjs.genSalt(10)
      const hashedPassword = await bcryptjs.hash(pwd, salt)
      
      try {
        const update = await db
          .collection("user")
          .updateOne({_id},
            {
              $set: {
                nama: nama,
                email: email,
                pwd: hashedPassword,
              },
              $currentDate: { lastUpdated: true }
            }
          )
        return res.status(200).json(update)
      } catch (error) {
        console.log(error)
        return res.status(500).json({error})
      }
      
  
    } catch (e) {
        console.error(e);
    }
  }
  else return res.status(500).json({error: "error"})
}