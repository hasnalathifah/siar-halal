// import { getResto } from "@/app/lib/data"
// import Card from "./card";

// export default async function CardComp() {
//     const resto = await getResto()
//     return(
//         <Card resto = {resto}/>
//     );
// }
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
// import { sql } from '@vercel/postgres';
// import { resto } from '@/lib/data';
// import { NextResponse } from 'next/server';
// import Image from 'next/image';
// import { Resto } from '@/app/lib/definition';
 
export default function CardComp() {
  const { data }: any = useSession();
  const user_id = data.user._id
  const [resto, setResto] = useState([{
    _id:'',
    nama_resto:'',
    alamat:'',
    lat:'',
    lon:''
  }])
  useEffect(()=>{
    async function getResto() {
      const resp = await axios.post('api/getallresto')
      if(resp) setResto(resp.data)
    }getResto()
  })
  return (
  <div>
      <ul>
        {resto?resto.map((resto,index) => (
          <li key={resto._id}>
            <a href={'dashboard/'+(index+1)+'?id='+(resto._id)+'&user_id='+(user_id)+'&nama='+(resto.nama_resto)+'&alamat='+(resto.alamat)+'&lat='+(resto.lat)+'&lon='+(resto.lon)} className=" w-full flex flex-row items-center bg-white border border-gray-200 rounded-full mb-2 shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <Image className="object-cover ml-2 rounded-full" src="/image/logo_resto.png" alt="" width={100} height={100}/>
              <div className="flex flex-col justify-between p-4 leading-normal">
                  <p className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">{resto.nama_resto}</p>
                  <p className="mb-1 font-light text-gray-700 dark:text-gray-400">{resto.alamat}</p>
              </div>
            </a>
          </li>
        )):null}
      </ul>
    </div>
  )
}