import Image from "next/image";
import AdminNavbar from "@/components/admnavbar";
import Sidebar from "@/components/sidebar";
import Map from "@/components/Map";
import { useSearchParams } from 'next/navigation'
import Link from "next/link";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";
import { Typography } from "@material-tailwind/react";
import { Card, CardBody } from "@material-tailwind/react";
import { stringify } from "querystring";


function setLatlon(data: any){
    let latlon = {}
    let lat = []
    let lon = []
    for (let i = 0; i < data.paths[0].points.coordinates.length; i++) {
        lon [i] = data.paths[0].points.coordinates[i][0]
        lat [i] = data.paths[0].points.coordinates[i][1]
    }
    localStorage.setItem("lat", JSON.stringify(lat));
    localStorage.setItem("lon", JSON.stringify(lon)); 
    latlon = {lat, lon}
    return latlon
}

export default function Items() {
    
    const seachParams = useSearchParams()
    const dLat = seachParams.get('lat')
    const dLon = seachParams.get('lon')
    // let srclat, srclon
    // console.log(destLat)
    // console.log(destLon)
    const nama = seachParams.get('nama')
    const alamat = seachParams.get('alamat')

    // if (destLat !== null ) data = await getDirections(Number(destLat), Number(destLon))

    const [resp, setResp] = useState([]);
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();

    useEffect(() => {
        if('geolocation' in navigator) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const lat = coords.latitude;
                const lon = coords.longitude
                setLatitude(lat);
                setLongitude(lon)
            })
        }
    }, []);

    // srclat = location.latitude
    // srclon = location.longitude

    useEffect(() => {
        const getDirections = async () => {
            // let currLong = pos[0];
            // let currLat = pos[1];
            const destLat = Number(dLat)
            const destLon = Number(dLon)
            // @ts-ignore: Unreachable code error
            const srcLat = Number(latitude)
            const srcLon = Number(longitude)
            const query = new URLSearchParams({
            key: 'e057b66d-cbe8-4c45-aa02-e0dbebbf77b8'
            }).toString();
            console.log(srcLat)
            console.log(srcLon)
        
            // if (destLat !== 0 ) {
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
                            srcLon,srcLat
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
            // console.log(data)
            
            // let loc = data.paths[0].points.coordinates;
            // for (let i = 0; i < data.paths[0].points.coordinates.length; i++) {
            //     lon [i] = data.paths[0].points.coordinates[i][0]
            //     lat [i] = data.paths[0].points.coordinates[i][1]
            // }
            // localStorage.setItem("lat", JSON.stringify(lat));
            // localStorage.setItem("lon", JSON.stringify(lon)); 

            setResp(data)
           
            // }
        };
        if (dLat !== null && latitude !== undefined)getDirections()
    }, [dLat, dLon, latitude, longitude]);

    // console.log(resp)

    let latlon = {}
    let map = []
    let lat = []
    let lon = []
    if (resp.length !== 0) {
        latlon = setLatlon(resp)
        lat = latlon.lat
        lon = latlon.lon
        map.push(
            <Map lat={lat} lon={lon}/>
        )
    }
    const str = JSON.stringify(latlon)
    let arButton = []
    if (resp.length!=0){
        arButton.push(
            <Link href={{pathname: "/ar", query: {str}}} type="button" className=" text-center mt-8 relative w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-8 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Mulai navigasi</Link>
        )
        console.log(resp)
    }
    else{
        arButton.push(
            <button className=" text-center mt-8 relative w-full text-white bg-blue-100 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-8 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Mulai navigasi</button>
        )
    }

    
    return (
        <div className=" bg-blue-gray-50">
            <Sidebar/>
            <div className="relative min-w-full grid place-items-start justify-center gap-2 ">
                <div className="divide-y place-items-center divide-blue-gray-100">
                    <div className="relative grid mt-8  place-items-start justify-center gap-2">
                        <input value={"Perum ITS Jl. Teknik Sipil W20"} type="text" id="disabled_standard" className="block w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled />
                        <label htmlFor="disabled_standard" className="relative text-sm text-black dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Lokasi asal</label>
                        <Link href="#" className=" w-full flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                            {/* <Image className="object-cover rounded-none rounded-s-lg" src="/image/food2.jpg" alt="" width={150} height={150}/> */}
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <p className="mb-2 break-words font-bold tracking-tight text-gray-900 dark:text-white">{nama}</p>
                                <p className="mb-1 break-words  font-light text-gray-700 dark:text-gray-400">{alamat}</p>
                            </div>
                        </Link>
                        {map}
                        {arButton}
                        <Link href="/dashboard" type="button" className=" text-center relative w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-8 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">Batalkan</Link>
                    </div>
                    <div className="relative grid place-items-start justify-center  mt-1">
                        <div className=" mt-7 mb-7 w-full">
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
                    <div className="relative grid place-items-start justify-center  mt-1">
                        <div className=" mt-2 mb-7 w-full">
                            <div className=" relative mt-6 p-4 w-full flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl">
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
                                            Hasna Lathifah
                                        </Typography>
                                        <Typography variant="small" className="font-medium !text-gray-500" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                            2 hours ago
                                        </Typography>
                                        </div>
                                        <div className="flex gap-1 mb-3 items-center">
                                        <table>
                                            <tbody>
                                            <tr>
                                                <th>
                                                <Typography className="w-full font-normal !text-gray-500" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                    Makanan
                                                </Typography>
                                                </th>
                                                <td className="px-6">
                                                <div className="rating">
                                                    <input disabled type="radio" name="makanan" className="mask mask-star-2 bg-orange-400" />
                                                    <input disabled type="radio" name="makanan" className="mask mask-star-2 bg-orange-400" />
                                                    <input disabled type="radio" name="makanan" className="mask mask-star-2 bg-orange-400" />
                                                    <input disabled type="radio" name="makanan" className="mask mask-star-2 bg-orange-400" checked />
                                                    <input disabled type="radio" name="makanan" className="mask mask-star-2 bg-orange-400" />
                                                </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                <Typography className="w-full font-normal !text-gray-500" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                    Pelayanan
                                                </Typography>
                                                </th>
                                                <td className="px-6">
                                                <div className="rating">
                                                    <input disabled type="radio" name="Pelayanan" className="mask mask-star-2 bg-orange-400" />
                                                    <input disabled type="radio" name="Pelayanan" className="mask mask-star-2 bg-orange-400" />
                                                    <input disabled type="radio" name="Pelayanan" className="mask mask-star-2 bg-orange-400" />
                                                    <input disabled type="radio" name="Pelayanan" className="mask mask-star-2 bg-orange-400" />
                                                    <input disabled type="radio" name="Pelayanan" className="mask mask-star-2 bg-orange-400" checked/>
                                                </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                <Typography className="w-full font-normal !text-gray-500" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                    Kebersihan
                                                </Typography>
                                                </th>
                                                <td className="px-6">
                                                <div className="rating">
                                                    <input disabled type="radio" name="kebersihan" className="mask mask-star-2 bg-orange-400" />
                                                    <input disabled type="radio" name="kebersihan" className="mask mask-star-2 bg-orange-400" />
                                                    <input disabled type="radio" name="kebersihan" className="mask mask-star-2 bg-orange-400" checked />
                                                    <input disabled type="radio" name="kebersihan" className="mask mask-star-2 bg-orange-400" />
                                                    <input disabled type="radio" name="kebersihan" className="mask mask-star-2 bg-orange-400" />
                                                </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        </div>
                                        <div className="flex gap-1 mt-8 mb-3 items-center">  
                                        <Typography className="w-full font-normal mb-4 !text-gray-500" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                        </Typography>          
                                        </div>
                                        <div className="flex gap-1 items-center">              
                                            <Image
                                            width={200}
                                            height={200}
                                            src={'/image/food.jpg'}
                                            alt="img"
                                            className="h-full rounded w-200 object-cover object-center"
                                            />
                                        </div>
                                    </div>
                                    </CardBody>
                                </Card>
                            </div>

                        </div>
                    </div>
                </div>
                
            </div>
            
        </div>
    );
}
