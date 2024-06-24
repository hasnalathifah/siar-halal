import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export default async function POST (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST'){
    try {
      const client = await clientPromise;
      const db = client.db("siar");
      const reqBody = req.body
      const {nama, email, password, password2} = reqBody
      if (email == null) return res.status(200).json({error: "kosong"})
      // const email = "hasna.lathifah03@gmail.com"
      // const password = "abcdefg"
      const user = await db
          .collection("user")
          .findOne({email})
          // .sort({ metacritic: -1 })
          // .limit(10)
          // .toArray();
      if(user){
        alert("email exist")
          return res.status(400).json({error: "Email already exist"})
      }
      const salt = await bcryptjs.genSalt(10)
      const hashedPassword = await bcryptjs.hash(password, salt)
      const newuser = {
        nama: nama,
        email: email,
        pwd: hashedPassword,
        gamification:{
          points: 0,
          level: 1,
          badge: "BASIC",
          mission: {
            week: 0,
            month: 0
          },
          totalweek: 0,
          totalmonth: 0
        }
      }
      try {
        const addUser = await db
        .collection("user")
        .insertOne(newuser)
        return res.status(200).json(addUser)
      } catch (error) {
        alert(error)
        return res.status(500).json({error})
      }
      
  
    } catch (e) {
        console.error(e);
    }
  }
  else return res.status(500).json({error: "error"})
}