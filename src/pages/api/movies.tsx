import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const id = "6666e995bf28e0650af0ef21"
        const client = await clientPromise;
        const db = client.db("siar");
        const update = await db
          .collection("user")
          .updateOne({_id: new ObjectId(id)},
            {
              $set: {
                nama: "Lathifah",
              },
              $currentDate: { lastUpdated: true }
            }
          )
        res.status(200).json(update)
      
    } catch (e) {
        console.error(e);
    }
}