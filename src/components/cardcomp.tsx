// import { getResto } from "@/app/lib/data"
// import Card from "./card";

// export default async function CardComp() {
//     const resto = await getResto()
//     return(
//         <Card resto = {resto}/>
//     );
// }
import Image from 'next/image';
// import { sql } from '@vercel/postgres';
import { resto } from '@/lib/data';
// import { NextResponse } from 'next/server';
// import Image from 'next/image';
// import { Resto } from '@/app/lib/definition';
 
export default function CardComp() {
    // const list = async () => sql`SELECT * from Resto`;
    // const results = await list();

//     let id = []
//     let Nama = []
//     let Alamat = []
//     let lat = []
//     let lon =[]
//     let name
    // const resto = results.rows
//     for (let i = 0; i < results.rowCount; i++) {
//         let data = results.rows[i];
//         id[i] = data.id_resto;
//         Nama[i] = data.nama_resto;
//         Alamat[i] = data.alamat;
//         lat[i] = data.lat;
//         lon[i] = data.lon;
//         list.push(
//         <a href="/dashboard/items" key={id[i]} className=" w-full flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
//             <Image className="object-cover rounded-none rounded-s-lg" src="/image/food2.jpg" alt="" width={150} height={150}/>
//             <div className="flex flex-col justify-between p-4 leading-normal">
//                 <p className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">{Nama[i]}</p>
//                 <p className="mb-1 font-light text-gray-700 dark:text-gray-400">{Alamat[i]}</p>
//             </div>
//         </a>
//         )
//     }

        return (
        <div>
            <ul>
              {resto.map((resto) => (
                <li key={resto.id_resto}>
                  <a href={'dashboard/'+(resto.id_resto)+'?id='+(resto.id_resto)+'&nama='+(resto.nama_resto)+'&alamat='+(resto.alamat)+'&lat='+(resto.lat)+'&lon='+(resto.lon)} className=" w-full flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <Image className="object-cover rounded-none rounded-s-lg" src="/image/food2.jpg" alt="" width={150} height={150}/>
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <p className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">{resto.nama_resto}</p>
                        <p className="mb-1 font-light text-gray-700 dark:text-gray-400">{resto.alamat}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )
    // } 
    // catch (error) {
    //   return NextResponse.json({ error }, { status: 500 });
    // }
}