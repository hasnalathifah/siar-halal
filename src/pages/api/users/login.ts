import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
// import bcryptjs from "bcryptjs";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function POST (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST'){
    try {
      const client = await clientPromise;
      const db = client.db("siar");
      const reqBody = req.body
      const {email, password} = reqBody
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
       //check if password is correct
      //  const validPassword = await bcryptjs.compare
      //  (password, user.password)
      // if(password != user.pwd){
      //   return res.status(400).json({error: "Invlid password"})
      // }
      
      //create token data
      // A JavaScript object (tokenData) is created to store essential user 
      // information. In this case, it includes the user's unique identifier (id), 
      // username, and email.
        
      // const tokenData = {
      //   id: user._id,
      //   username: user.username,
      //   email: user.email
      // }
      
      // Create a token with expiration of 1 day
      // const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})
      
      // Create a JSON response indicating successful login
      const response = res.json({
        message: "Login successful",
        success: true,
      })
      
      // Set the token as an HTTP-only cookie
      // response.cookies.set("token", token, {
      //   httpOnly: true,
      // })
      
      return response;
  
    } catch (e) {
        console.error(e);
    }
  }
  else return res.status(200).json({error: "error"})
}