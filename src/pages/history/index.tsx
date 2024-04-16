import Image from "next/image"
import Sidebar from "@/components/sidebar"
import { Typography } from "@material-tailwind/react"

export default function History(){
  return(
    <>
      <Sidebar/>
      <div className="relative md:grid ml-5 mr-5 min-h-screen mt-8 place-items-start justify-center gap-2 ">
        {/* <div className="divide-y divide-blue-gray-100"> */}
          <div className="relative place-items-start justify-center gap-2">
          <Typography placeholder={""} variant="h3" className=" text-blue-gray-700" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}> Riwayat </Typography>
            <div className=" mt-4 w-full flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <Image className="object-cover rounded-none rounded-s-lg" src="/image/food2.jpg" alt="" width={150} height={150}/>
              <div className="flex flex-col divide-y divide-gray-200 justify-between p-4 leading-normal">
                <div className="mb-2">
                  <p className="mb-1 font-light text-gray-700">14 April 2024</p>
                  <p className="mb-2 font-bold tracking-tight text-gray-900">Kantin Pusat ITS</p>
                  <p className="mb-1 font-light text-gray-700">Jl. Teknik Mesin No 173, Keputih, Sukolilo, Surabaya</p>
                </div>
                <div className="mt-1">
                  <div className="mt-3">
                  <a href="/history/review" className=" mb-1 font-light text-blue-700 hover:text-blue-200">Berikan ulasan</a>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        {/* </div> */}
      </div>
    </>
  )
}