"use client";

import Image from "next/image";
import AdminNavbar from "@/components/admnavbar";
import Map from "@/components/Map";
import { useSearchParams } from 'next/navigation'

// function getlocation() {
//     navigator.geolocation.getCurrentPosition((position) => {
//         let pos = [position.coords.longitude,position.coords.latitude]
//         getDirections(pos);
//     });
// };

const getDirections = async (destLat: number, destLon: number) => {
    // let currLong = pos[0];
    // let currLat = pos[1];
    console.log(destLat)
    console.log(destLon)
    const query = new URLSearchParams({
      key: 'e057b66d-cbe8-4c45-aa02-e0dbebbf77b8'
    }).toString();

 
    const resp = await fetch(
      `https://graphhopper.com/api/1/route?${query}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            points: [
              [
                112.796585,-7.289299
              ],
              [
                destLon, destLat
              ]
            ],
            snap_preventions: [
              'motorway',
              'ferry',
              'tunnel'
            ],
            details: ['road_class', 'surface'],
            vehicle: 'foot',
            locale: 'en',
            instructions: true,
            calc_points: true,
            points_encoded: false
        })
      }
    );
    
    const data = await resp.json();

    console.log(data)
    
    // let loc = data.paths[0].points.coordinates;
    let lat = [];
    let lon = [];
    for (let i = 0; i < data.paths[0].points.coordinates.length; i++) {
        lon [i] = data.paths[0].points.coordinates[i][0]
        lat [i] = data.paths[0].points.coordinates[i][1]
    }
    localStorage.setItem("lat", JSON.stringify(lat));
    localStorage.setItem("lon", JSON.stringify(lon));      
};

  

export default function Items() {
    const seachParams = useSearchParams()
    const destLat = seachParams.get('lat')
    const destLon = seachParams.get('lon')
    // localStorage.setItem("destLat", JSON.stringify(Number(destLat)))
    // localStorage.setItem("destLon", JSON.stringify(Number(destLon)))
    // console.log(destLat)
    // console.log(destLon)
    const nama = seachParams.get('nama')
    const alamat = seachParams.get('alamat')
    if (Number(destLat) != 0) getDirections(Number(destLat),Number(destLon))
    return (
        <div className=" bg-blue-gray-50">
            <AdminNavbar/>
            <div className="relative min-w-full mt-8 grid place-items-start justify-center gap-2 ">
                <div className="divide-y divide-blue-gray-100">
                    <div className="relative grid place-items-start justify-center gap-2">
                        <input value={"Perum ITS Jl. Teknik Sipil W20"} type="text" id="disabled_standard" className="block w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled />
                        <label htmlFor="disabled_standard" className="relative text-sm text-black dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Lokasi asal</label>
                        <a href="#" className=" w-full flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                            {/* <Image className="object-cover rounded-none rounded-s-lg" src="/image/food2.jpg" alt="" width={150} height={150}/> */}
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <p className="mb-2 break-words font-bold tracking-tight text-gray-900 dark:text-white">{nama}</p>
                                <p className="mb-1 break-words  font-light text-gray-700 dark:text-gray-400">{alamat}</p>
                            </div>
                        </a>
                        <Map/>
                        <button type="button" className=" mt-8 relative w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-8 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Mulai navigasi</button>
                        <a href="/dashboard" type="button" className=" text-center relative w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-8 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">Batalkan</a>
                    </div>
                    <div className="relative w-full place-items-start justify-center mt-1">
                        <div className=" mt-7 w-full">
                            <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex items-center justify-between mb-4">
                                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Makanan di Resto ini</h5>
                                </div>
                                <div className="flow-root">
                                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                            <li className="py-3 sm:py-4">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <Image className="w-10 h-10 rounded-full" src="/image/food.png" width={100} height={100} alt="Neil image"/>
                                                    </div>
                                                    <div className="flex-1 min-w-0 ms-4">
                                                        <p className="text-sm break-words font-medium text-gray-900 dark:text-white">
                                                            Ayam goreng
                                                        </p>
                                                        <p className="text-sm break-words text-gray-500 dark:text-gray-400">
                                                            Deskripsi makanan
                                                        </p>
                                                    </div>
                                                    <div className="inline-flex ml-10 items-center text-base font-semibold text-gray-900 dark:text-white">
                                                        Rp 10.000
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="py-3 sm:py-4">
                                                <div className="flex items-center ">
                                                    <div className="flex-shrink-0">
                                                        <Image className="w-10 h-10  rounded-full" src="/image/food.png" width={100} height={100} alt="Bonnie image"/>
                                                    </div>
                                                    <div className="flex-1 min-w-0 ms-4">
                                                        <p className="text-sm break-words font-medium text-gray-900  dark:text-white">
                                                            Bebek goreng
                                                        </p>
                                                        <p className="text-sm break-words text-gray-500  dark:text-gray-400">
                                                            Deskripsi makanan
                                                        </p>
                                                    </div>
                                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                        Rp 10.000
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="py-3 sm:py-4">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <Image className="w-10 h-10 rounded-full" src="/image/food.png" width={100} height={100} alt="Michael image"/>
                                                    </div>
                                                    <div className="flex-1 min-w-0 ms-4">
                                                        <p className="text-sm break-words font-medium text-gray-900  dark:text-white">
                                                            Ikan Bakar
                                                        </p>
                                                        <p className="text-sm break-words text-gray-500  dark:text-gray-400">
                                                            Deskripsi makanan
                                                        </p>
                                                    </div>
                                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                        Rp 10.000
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                </div>
                                <div className=" mt-3 flex items-center justify-between mb-4">
                                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Minuman di Resto ini</h5>
                                </div>
                                <div className="flow-root">
                                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                            <li className="py-3 sm:py-4">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <Image className="w-10 h-10 rounded-full" src="/image/food.png" width={100} height={100} alt="Neil image"/>
                                                    </div>
                                                    <div className="flex-1 min-w-0 ms-4">
                                                        <p className="text-sm break-words font-medium text-gray-900  dark:text-white">
                                                            Teh hangat/dingin
                                                        </p>
                                                        <p className="text-sm break-words text-gray-500  dark:text-gray-400">
                                                            Deskripsi minuman
                                                        </p>
                                                    </div>
                                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                        Rp 10.000
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="py-3 sm:py-4">
                                                <div className="flex items-center ">
                                                    <div className="flex-shrink-0">
                                                        <Image className="w-10 h-10 rounded-full" src="/image/food.png" width={100} height={100} alt="Bonnie image"/>
                                                    </div>
                                                    <div className="flex-1 min-w-0 ms-4">
                                                        <p className="text-sm break-words font-medium text-gray-900  dark:text-white">
                                                            Jeruk hangat/dingin
                                                        </p>
                                                        <p className="text-sm break-words text-gray-500  dark:text-gray-400">
                                                            Deskripsi minuman
                                                        </p>
                                                    </div>
                                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                        Rp 10.000
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="py-3 sm:py-4">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <Image className="w-10 h-10 rounded-full" src="/image/food.png" width={100} height={100} alt="Michael image"/>
                                                    </div>
                                                    <div className="flex-1 min-w-0 ms-4">
                                                        <p className="text-sm font-medium text-gray-900  dark:text-white">
                                                            Kopi
                                                        </p>
                                                        <p className="text-sm text-gray-500  dark:text-gray-400">
                                                            Deskripsi minuman
                                                        </p>
                                                    </div>
                                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                        Rp 10.000
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                
            </div>
            
        </div>
    );
}