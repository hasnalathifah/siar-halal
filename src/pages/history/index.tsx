import Image from "next/image"
import Sidebar from "@/components/sidebar"
import { Typography } from "@material-tailwind/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import axios from "axios"
import gethistory from "@/pages/api/gethistory"
import { useSearchParams } from "next/navigation"

export default function History(){
  const { data }: any = useSession()
  const seachParams = useSearchParams()
  const point = seachParams.get('point')
  const [open, setOpen] = useState(true)
  const [hist, setHist] = useState([{
    _id:'',
    id_user:'',
    id_resto:'',
    nama_resto:'',
    date:'',
    review:''
  }])
  useEffect(()=>{
    async function getHistory() {
      if(data){
        const id = data.user._id
        const history = await axios.post('api/gethistory',{id})
        if(history){
          setHist(history.data)
          // console.log(hist)
        }
      }   
    }getHistory()
  })
  const modal = <div id="my_modal_1" className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
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
        <button onClick={()=>{setOpen(false)}} className=" mt-8 mb-8 relative text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          OK
        </button>
      </div>
    </div>
  </div>
</div>

  return(
    <>
    <div className=" min-h-screen bg-light-blue-50">
      <Sidebar/>
      <div className="relative md:grid md:grid-cols-6 ml-5 mr-5 min-h-screen place-items-start justify-center gap-2 ">
        {/* <div className="divide-y divide-blue-gray-100"> */}
          <div className="relative md:col-start-3 md:col-span-2 w-full place-items-start mt-8 justify-center gap-2">
          <Typography placeholder={""} variant="h3" className=" text-blue-gray-700" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}> Riwayat </Typography>
          {hist?(hist.map((hist)=>(
            <div className="w-full" key={hist._id}>
              <div className=" mt-2 w-full flex flex-row items-center bg-white border border-gray-200 rounded-full shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <Image className="object-cover ml-2 rounded-full" src="/image/logo_resto.png" alt="" width={100} height={100}/>
                <div className="flex flex-col divide-y divide-gray-200 justify-between p-2 leading-normal">
                  <div className="mb-1">
                    <p className="mb-1 font-light text-gray-700">{hist.date}</p>
                    <p className="mb-1 font-bold tracking-tight text-gray-900">{hist.nama_resto}</p>
                    {/* <p className="mb-1 font-light text-gray-700">Jl. Teknik Mesin No 173, Keputih, Sukolilo, Surabaya</p> */}
                  </div>
                  <div className="mt-1">
                    <div className="mt-2">
                    {(hist.review&&hist.review=='yes')?
                      <p className=" mb-1 font-light text-green-800">Ulasan telah terkirim</p>
                        :
                        <Link href={"/review?id="+hist._id+"&id_resto="+hist.id_resto} className=" mb-1 font-light text-blue-700 hover:text-blue-200">Berikan ulasan</Link>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))):null}
          </div>
        {/* </div> */}
      </div>
      {(point!=null&&open)?modal:''}
      </div>
    </>
  )
}