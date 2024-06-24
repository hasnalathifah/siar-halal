import Sidebar from "@/components/sidebar";
import { Typography } from "@material-tailwind/react";
import clientPromise from "@/lib/mongodb";
import { GetServerSideProps } from 'next';
import { ObjectId } from "mongodb";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";

interface User {
  _id: string;
  nama: String,
  email: String,
  pwd: String,
  gamification:{
    points: String,
    level: String,
    badge: String,
    mission: {
      week: String,
      month: String
    }
    totalweek: string,
    totalmonth: string
  }
}


interface UsersProps {
  users: User[];
}

const Users: React.FC<UsersProps> = ({ users }) => {
  const { data }: any = useSession()
  const itemsPerPage = 20;
    const [page, setPage] = useState(1);
    const displayData = useMemo(() => {
        const start = (page - 1) * itemsPerPage;
        return users.slice(start, start + itemsPerPage);
    }, [page, users]);
  return(
  <>
    <div className=" min-h-screen bg-light-blue-50">
      <Sidebar/>
      <div className="relative md:grid ml-5 mr-5 min-h-screen place-items-start justify-center gap-2 ">
        {/* <div className="divide-y divide-blue-gray-100"> */}
          <div className="relative place-items-start mt-8 justify-center gap-2">
          <Typography placeholder={""} variant="h3" className=" text-blue-gray-700" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}> Leaderboard </Typography>
            <div className=" mt-4 w-full flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div className="relative rounded-lg overflow-x-auto">
              <table className=" table table-xs w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th></th>
                          <th scope="col" className="px-6 py-3">
                              Nama
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Email
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Points
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Level
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Badge
                          </th>
                          <th scope="col" className="px-6 py-3">
                              jml misi mingguan
                          </th>
                          <th scope="col" className="px-6 py-3">
                              jml misi bulanan
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                    {displayData.map((user, index) => (
                      <tr key={user._id} className={(data&&(user._id==data.user._id))?" bg-blue-gray-100 border-b":"bg-white border-b"}>
                      <th>{index+1}</th>
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {user.nama}
                      </th>
                      <td className="px-6 py-4">
                          {user.email}
                      </td>
                      <td className="px-6 py-4">
                          {user.gamification.points}
                      </td>
                      <td className="px-6 py-4">
                          {user.gamification.level}
                      </td>
                      <td className="px-6 py-4">
                          {user.gamification.badge}
                      </td>
                      <td className="px-6 py-4">
                          {user.gamification.totalweek}
                      </td>
                      <td className="px-6 py-4">
                          {user.gamification.totalmonth}
                      </td>
                  </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* <button onClick={() => setPage(page + 1)}> Next Page </button>
            <button onClick={() => setPage(page - 1)}> Prev Page </button> */}
          </div>
        {/* </div> */}
      </div>
    </div>
  </>
  );
}

export default Users

export const getServerSideProps: GetServerSideProps = async () => {
  try {
      const client = await clientPromise;
      const db = client.db("siar");
      const user = await db
        .collection("user")
        .find({})
        .sort({gamification:-1})
        .toArray()
      return {
          props: { users: JSON.parse(JSON.stringify(user)) },
      };
  } catch (e) {
      console.error(e);
      return { props: { users: [] } };
  }
};