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
      const {id, idrest, email, week, month} = req.body
      const id_user = String(id)
      const id_resto = String(idrest)
      if (email == null) return "kosong"
      // const email = reqBody
      // const email = "hasna.lathifah03@gmail.com"
      // const password = "abcdefg"
      // const _id = new ObjectId(id)
      
      try {
        const today = new Date()
        const lastupdate = await db
            .collection("user")
            .findOne({
              "email":email,
              "gamification.mission.update":today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()
            })
        if(lastupdate) return res.status(200).json("noupdate")
        for (let i = 1; i <= Number(week); i++) {
          const y = new Date(today)
          y.setDate(y.getDate() - i)
          const date = y.getDate()+'/'+(y.getMonth()+1)+'/'+y.getFullYear()
          const history = await db
            .collection("riwayat_mengunjungi")
            .findOne({id_user,id_resto,date})
            if(history){
              return res.status(200).json("noupdate")
            }
        }
        if(Number(week) == 6){
          const update = await db
          .collection("user")
          .updateOne({"email":email},
            {
              $set : {
                "gamification.mission.week" : 0,
                "gamification.mission.update" : today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()
              },
              $inc : {
                "gamification.points":30,
                "gamification.totalweek" : 1
              }
            }
          )
          if(Number(month)==3){
            const update = await db
            .collection("user")
            .updateOne({"email":email},
              {
                $set : {
                  "gamification.mission.month" : 0,
                  "gamification.mission.update" : today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()
                },
                $inc : {
                  "gamification.points":50,
                  "gamification.totalmonth" : 1
                }
              }
            )
            return res.status(200).json("complete-mission-month")
          }
          else {
            const update = await db
            .collection("user")
            .updateOne({"email":email},
              {
                $inc : {
                  "gamification.mission.month" : 1,
                },
                $set : {
                  "gamification.mission.update" : today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()
                }
              }
            )
            return res.status(200).json("complete-mission-week")
          }
        }
        else {
          const update = await db
          .collection("user")
          .updateOne({"email":email},
            {
              $inc : {
                "gamification.mission.week" : 1,
              },
              $set :{
                "gamification.mission.update" : today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()
              }
            }
          )
          return res.status(200).json("update-week")
        }

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