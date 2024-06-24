import clientPromise from "@/lib/mongodb";
// import User from "@/models/user";
import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";

const authOptions : NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        // email: {label: "Email", type: "email"},
        // password: {label: "Password", type: "password"}
      },

      async authorize(credentials) {
        const { email, password } = credentials as {
          email: String;
          password: any
        }

        try {
          const client = await clientPromise;
          const db = client.db("siar");
          const user : any = await db
          .collection("user")
          .findOne({email})

          if (!user) {
            return null;
          }
          const passwordsMatch = await bcryptjs.compare(password, user.pwd);

          if (!passwordsMatch) {
            console.log("wrong password")
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: "+ error);
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
      token = user;
      }
      return token;
    },
    async session({session, token, user}: any){
      if ("email" in token){
        session.user = token
      }
      return session;
    },
  }
};

export default NextAuth(authOptions)