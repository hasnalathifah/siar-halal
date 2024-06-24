import { Card, CardBody, Typography } from "@material-tailwind/react";
import Image from "next/image"
import Sidebar from "@/components/sidebar"
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import router from 'next/router';

export default function Review(){
  const { data }: any = useSession();
  const seachParams = useSearchParams()
  const id_resto = seachParams.get('id_resto')
  const id = seachParams.get('id')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [resto, setResto] = useState('')
  const [alamat, setAlamat] = useState('')
  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')

  useEffect(()=>{
    async function findResto() {
      const find = await axios.post('api/findresto',{id_resto})
      if (find){
        setResto(find.data.nama_resto)
        setAlamat(find.data.alamat)
      }
    }findResto()
  },[resto, alamat, id_resto])

  useEffect(()=>{
    async function findUser() {
      if(data){
        const id = data.user._id
        const find = await axios.post('api/users/find',{id})
        if (find){
          setNama(find.data.nama)
          setEmail(find.data.email)
        }
      }
    }findUser()
  },[data])
  
  async function onSend(){
    const id_user = data?data.user._id:''
    const check = await axios.post('api/checkreview', {id_user, id_resto})
    if(check.data=="belum"){
      const response = await axios.post("/api/addpoint", {email});
      const insert = await axios.post('api/addreview',{id, id_user, id_resto, nama, email, rating, comment})
      router.push("/history?point=1")
    }
    else {
      const insert = await axios.post('api/addreview',{id, id_user, id_resto, nama, email, rating, comment})
      router.push("/history")
    }
  }
  return(
    <>
    <div className="min-h-screen bg-light-blue-50">
      <Sidebar/>
      <div className="relative md:grid ml-5 mr-5 min-h-screen place-items-start justify-center gap-2 ">
        {/* <div className="divide-y divide-blue-gray-100"> */}
          <div className="relative place-items-start justify-center gap-2">
            <div className=" mt-4 w-full flex flex-row items-center bg-white border border-gray-200 rounded-full shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <Image className="object-cover ml-2 rounded-full" src="/image/logo_resto.png" alt="" width={100} height={100}/>
              <div className="flex flex-col divide-y divide-gray-200 justify-between p-4 leading-normal">
                <div className="mb-2">
                  <p className="mb-2 font-bold tracking-tight text-gray-900">{resto}</p>
                  <p className="mb-1 font-light text-gray-700">{alamat}</p>
                </div>
              </div>
            </div>
            <div className=" mt-6 p-4 w-full flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl">
              <Card
                shadow={false}
                color="transparent"
                className="grid items-center gap-6 " placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
              >
                <CardBody className="p-0 gap-5 flex " placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  <div className=" !m-0 h-full  w-full  max-h-[40px] max-w-[40px] ">
                    <Image
                      width={768}
                      height={768}
                      src={'/image/food-bg.jpg'}
                      alt="img"
                      className="h-full rounded w-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <div className="flex gap-1 mb-3 items-center">
                      <Typography
                        variant="small"
                        className=" font-bold flex items-center gap-2 !text-gray-900" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                      >
                        {nama}
                      </Typography>
                      
                    </div>
                    <div className="flex gap-1 mb-3 items-center">
                      <table>
                        <tbody>
                        <tr>
                            <th>
                              <Typography className="w-full font-normal !text-gray-500" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                Rating
                              </Typography>
                            </th>
                            <td className="px-6">
                              <div className="rating">
                                <input type="radio" name="makanan" onClick={() => setRating(1)} className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="makanan" onClick={() => setRating(2)} className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="makanan" onClick={() => setRating(3)} className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="makanan" onClick={() => setRating(4)} className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="makanan" onClick={() => setRating(5)} className="mask mask-star-2 bg-orange-400" />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="flex gap-1 mt-8 mb-3 items-center">  
                      <div className="sm:col-span-2">
                          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            <Typography
                            variant="small"
                            className=" font-bold flex items-center gap-2 !text-gray-900" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                            >
                              Tuliskan komentar anda
                            </Typography>
                          </label>
                          <textarea id="description" rows={8} onChange={(e) => setComment(e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Tuliskan komentar anda..."></textarea>
                      </div>              
                    </div>
                    {/* <div className="flex gap-1 items-center">              
                      <label className="block mt-3 mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
                        <Typography
                        variant="small"
                        className=" font-bold flex items-center gap-2 !text-gray-900" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                        >
                          Tambahkan foto
                        </Typography>
                      </label>
                    </div>
                    <div className="flex gap-1 mb-2 items-center">
                      <input type="file" className=" bg-transparent file-input file-input-bordered file-input-primary w-full max-w-xs" />
                    </div>
                    <div className="flex gap-1 mb-3 items-center">
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">{'SVG, PNG, JPG or GIF (MAX. 800x400px).'}</p>
                    </div> */}
                    <div className="flex gap-1 mt-4 mb-3 items-center">
                      <button onClick={onSend} className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800  ">Kirim</button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        {/* </div> */}
      </div>
    </div>
    </>
  )
}