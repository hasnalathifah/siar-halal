import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { ObjectId } from "mongodb";

export default async function POST (req: NextApiRequest, res: NextApiResponse) {
  // if (req.method === 'POST'){
    try {
      const client = await clientPromise;
      const db = client.db("siar");
      const {email} = req.body
      if (email == null) return "kosong"
      // const email = reqBody
      // const email = "hasna.lathifah03@gmail.com"
      // const password = "abcdefg"
      // const _id = new ObjectId(id)
      
      try {
        const update = await db
          .collection("user")
          .updateOne({"email":email},
            {
              $set : {
                "gamification.mission.week" : 0,
                "gamification.mission.month" : 0
              }

            }
          )
          // .findOne(_id)
        return res.status(200).json(update)
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