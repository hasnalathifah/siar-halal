import Sidebar from "@/components/sidebar";
import { Typography } from "@material-tailwind/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import router from "next/router";

export default function Finish() {
  const { data }: any = useSession()
  const seachParams = useSearchParams()
  const message = seachParams.get('message')
  const email = seachParams.get('email')
  // const points = seachParams.get('points')
  const level = seachParams.get('level')
  let mission_info = []
  if (message == "complete-mission-week"){
    mission_info.push(
    <>
    <Typography
      variant="h5"
      className=" text-center mt-4 mb-4 ml-5 mr-5 w-full md:max-w-full lg:max-w-3xl text-blue-gray-700"
      placeholder={""} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
      Dan menyelesaikan
    </Typography>
    <Typography placeholder={""} variant="h4" color="blue-gray" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      Misi mingguan : +30 XP
    </Typography>
    </>)
  }
  else if (message == "complete-mission-month"){
    mission_info.push( <>
    <Typography
      variant="h5"
      className=" text-center mt-4 mb-4 ml-5 mr-5 w-full md:max-w-full lg:max-w-3xl text-blue-gray-700"
      placeholder={""} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
      Dan menyelesaikan
    </Typography>
    <Typography placeholder={""} variant="h5" color="blue-gray" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      Misi mingguan : +30 XP
    </Typography>
    <Typography placeholder={""} variant="h5" color="blue-gray" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      Misi bulanan : +50 XP
    </Typography>
  </>)
  }
  const clicked = async () => {
    // router.push("/dashboard")
    try {
      const id = data.user._id
      let points
      const user = await axios.post("/api/users/find", {id});
      if (user) points = user.data.gamification.points
      const response = await axios.post("/api/level", {email, points, level});
      // console.log(response)
      if(response.data.level && response.data.badge) {
        const level = response.data.level
        const badge = response.data.badge
        router.push("https://siar-halal.vercel.app/dashboard?level="+level+"&badge="+badge)
      }
      else if(response.data.level) {
        const level = response.data.level
        router.push("https://siar-halal.vercel.app/dashboard?level="+level)
      }
      else router.push("https://siar-halal.vercel.app/dashboard")
    } catch (error:any) {
        console.log(error.message);
    }
  }


  return(
  <>
    <div className=" bg-light-blue-50">
      {/* <Sidebar/> */}
      <div className="relative md:grid ml-5 mr-5 min-h-screen place-content-center justify-center gap-2 ">
        {/* <div className="divide-y divide-blue-gray-100"> */}
          <div className="relative place-content-center justify-center gap-2">
            <div className="bg-white border-gray-200 rounded-lg shadow">
              <div className="relative grid place-items-center justify-center">
                <Image className="mt-8 ml-8 mr-8" src="/image/point.gif" alt="" width={300} height={300}></Image>
                <Typography placeholder={""} variant="h3" color="blue-gray" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  Selamat!
                </Typography>
                <Typography
                  variant="h5"
                  className=" text-center mt-4 mb-4 ml-5 mr-5 w-full md:max-w-full lg:max-w-3xl text-blue-gray-700"
                  placeholder={""} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
                  Anda berhasil mendapatkan
                </Typography>
                <Typography placeholder={""} variant="h3" color="blue-gray" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  +10 XP
                </Typography>
                {mission_info}
                <button onClick={clicked} className=" mt-8 mb-8 relative text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                  Kembali ke dashboard
                </button>
              </div>
            </div>
          </div>
        {/* </div> */}
      </div>
    </div>
  </>
  );
}