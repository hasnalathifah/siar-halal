import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {query} = req.body
        // const _id = new ObjectId(id)
        const client = await clientPromise;
        const db = client.db("siar");
        const resto = await db
          .collection("resto")
          .aggregate([
            {
              $search:{
                index: "search_resto",
                text: {
                  query: query,
                  path: {
                    wildcard: "*"
                  }
                }
              }
            }
          ])
          .toArray()
          return res.status(200).json(resto)
    } catch (e) {
        console.error(e);
        return res.status(500).json(e)
    }
}