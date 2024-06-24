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
      const {email, points, level} = req.body
      const p = Number(points)
      const lvl = Number(level)
      // if (email == null) return "kosong"
      // const email = reqBody
      // const email = "hasna.lathifah03@gmail.com"
      // const password = "abcdefg"
      // const _id = new ObjectId(id)
      const div = (p/250)
      if (div >= lvl){
        try {
          const levelup = await db
            .collection("user")
            .updateOne({email},
              {
                $inc : {
                  "gamification.level" : 1
                }
              }
            )
        } catch (error) {
          console.log(error)
          return res.status(500).json({error})
        } 
        if (lvl==2){
          const levelup = await db
            .collection("user")
            .updateOne({email},
              {
                $set : {
                  "gamification.badge" : "EXPLORER"
                }
              }
            )
            return res.status(200).json({level:lvl+1, badge:"EXPLORER"})
        }
        else if (lvl == 5){
          const levelup = await db
            .collection("user")
            .updateOne({email},
              {
                $set : {
                  "gamification.badge" : "ADVANCED"
                }
              }
            )
            return res.status(200).json({level:lvl+1, badge:"ADVANCED"})
        }
        else if (lvl == 10){
          const levelup = await db
            .collection("user")
            .updateOne({email},
              {
                $set : {
                  "gamification.badge" : "PRO"
                }
              }
            )
            return res.status(200).json({level:lvl+1, badge:"PRO"})
        }
        else if (lvl==19){
          const levelup = await db
            .collection("user")
            .updateOne({email},
              {
                $set : {
                  "gamification.badge" : "MASTER"
                }
              }
            )
            return res.status(200).json({level:lvl+1, badge:"MASTER"})
        }
        else return res.status(200).json({level:lvl+1})
      }
      return res.status(200).json({div,lvl})  
    } catch (e) {
        console.error(e);
    }
  // }
  // else res.status(500).json({error: "error"})
}