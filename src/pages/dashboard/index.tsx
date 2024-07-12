import CardComp from "@/components/cardcomp";
import Sidebar from "@/components/sidebar";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Typography } from "@material-tailwind/react";

export default function Dashboard() {
    const seachParams = useSearchParams()
    const level = seachParams.get('level')
    const badge = seachParams.get('badge')
    const { data }: any = useSession();
    const user_id = data?data.user._id:''
    const [user, setUser] = useState(Object);
    const [info, setInfo] = useState(Object);
    const [mission, setMission] = useState(Object);
    const [open, setOpen] = useState(true)
    const [query, setQuery] = useState('')
    const [issearch, setIssearch] = useState(false)
    const [result, setResult] = useState([{
        _id:'',
        nama_resto:'',
        alamat:'',
        lat:'',
        lon:''
    }])

    let isbadge = []
    if (badge != null){
        isbadge.push(<>
            <Typography
            variant="h5"
            className=" text-center mt-2 mb-2 ml-5 mr-5 w-full md:max-w-full lg:max-w-3xl text-blue-gray-700"
            placeholder={""} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
            Dan mendapatkan badge
            </Typography>
            <Typography placeholder={""} variant="h3" color="blue-gray" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                {badge}
            </Typography>
        </>)
    }
    const modal = <div id="my_modal_1" className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
        <div className="bg-white m-4 border-gray-200 rounded-lg shadow">
            <div className="relative grid place-items-center justify-center">
                <Image className="mt-2 ml-8 mr-8" src="/image/uplevel.gif" alt="" width={300} height={300}></Image>
                <Typography placeholder={""} variant="h3" color="blue-gray" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    Selamat!
                </Typography>
                <Typography
                    variant="h5"
                    className=" text-center mt-2 mb-2 ml-5 mr-5 w-full md:max-w-full lg:max-w-3xl text-blue-gray-700"
                    placeholder={""} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
                    Anda naik ke
                </Typography>
                <Typography placeholder={""} variant="h3" color="blue-gray" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    Level {Number(level)}
                </Typography>
                {isbadge}
                {/* <form method="dialog"> */}
                    <button onClick={()=>{setOpen(false)}} className=" mt-8 mb-8 relative text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        OK
                    </button>
                {/* </form> */}
            </div>
        </div>
     </div>
    const today = new Date()
    const y = new Date(today)
    y.setDate(y.getDate() - 1)
    const yesterday = y.getDate()+'/'+(y.getMonth()+1)+'/'+y.getFullYear()
    useEffect(()=>{
        async function getUser() {
            if(data){
                try {
                    const id = data.user._id
                    const response = await axios.post("/api/users/find", {id});
                    if (response) {
                        setUser (response.data)
                        setInfo(response.data.gamification)
                        setMission(response.data.gamification.mission)
                        // console.log(yesterday+" "+mission.update)
                        const arr = mission.update
                        const upd = arr.split("/")
                        const yes = yesterday.split("/")
                        // console.log(upd[1]+" "+yes[1])
                        if (mission.update && upd[2] < yes[2]){
                            const email = user.email
                            const reset = await axios.post("/api/resetmission", {email});
                        }
                        else if (mission.update && upd[1] < yes[1]){
                            const email = user.email
                            const reset = await axios.post("/api/resetmission", {email});
                        }
                        else if(mission.update && upd[0] < yes[0]){
                            const email = user.email
                            const reset = await axios.post("/api/resetmission", {email});
                        }
                    }
                    else console.log("null")
                } catch (e) {
                    console.log("error");
                }
            }
            else console.log("kosong")
        }getUser()
    }, [data, user, mission, yesterday])
    let image
    if (info.badge=="BASIC") {
        image = <Image className="object-cover rounded-full" src="/image/basic.png" alt="" width={30} height={30}/>
    }
    else if (info.badge=="EXPLORER") {
        image = <Image className="object-cover rounded-full" src="/image/explorer.png" alt="" width={40} height={40}/>
    }
    else if (info.badge=="ADVANCED") {
        image = <Image className="object-cover rounded-full" src="/image/advanced.png" alt="" width={40} height={40}/>
    }
    else if (info.badge=="PRO") {
        image = <Image className="object-cover rounded-full" src="/image/pro.png" alt="" width={40} height={40}/>
    }
    else if (info.badge=="MAASTER") {
        image = <Image className="object-cover rounded-full" src="/image/master.png" alt="" width={40} height={40}/>
    }
    async function search() {
        setIssearch(true)
        console.log(query)
        const search = await axios.post('api/searchresto',{query})
        console.log(search)
        setResult(search.data)
    }
    // if (mission.update && mission.update )
    return (
        <div className="min-h-screen bg-light-blue-50">
            <Sidebar/>
            <div className="relative grid place-items-start justify-center gap-2">
                <div className=" md:mt-2 md:rounded pl-4 pr-4 w-full bg-light-blue-600">
                    <div className=" overflow-x-auto relative flex flex-col items-center justify-center break-words w-full mb-2">
                        <h6 className=" text-white md:mt-4 mt-1 mb-4 text-xl font-bold">Selamat Datang, { user? user.nama : ""}!</h6>
                        {/* <div className=" relative mb-6 rounded-lg bg-light-blue-50 border-0 stats">  
                            <div className="stat"> */}
                                {/* <div className="stat-figure text-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </div> */}
                                {/* <div className="stat-title text-blue-gray-700 ">{"Points (xp)"}</div>
                                <div className="stat-value text-lg text-light-blue-900">{info? info.points:""}</div>
                            </div>
                            
                            <div className="stat">
                                <div className="stat-title text-blue-gray-700 ">Level</div>
                                <div className="stat-value text-lg text-light-blue-900">{info? info.level : ""}</div>
                            </div>
                            
                            <div className="stat">
                                <div className="stat-title text-blue-gray-700 ">Badge</div>
                                <div className="stat-value text-lg text-light-blue-900">{info?info.badge:""}</div>
                            </div>
                            
                        </div> */}
                        <div className=" border-y-4 border-white relative flex flex-col items-center justify-center mb-4 px-8">
                            <div className=" mt-4 mb-2 flex items-center justify-center">
                               {info?image:''}
                                <h5 className=" text-white ml-2 text-xl font-bold">{ info? info.badge : ""}</h5>
                            </div>
                            
                            <div className=" place-content-start mb-4">
                                <div className="grid grid-cols-3">
                                    <p className=" col-span-2 text-white text-xl font-normal">Level {info?info.level:''}</p>
                                    <p className=" col-span-1 text-white text-xl font-normal">{info?info.points:''} XP</p>
                                </div>
                                
                                <progress className="progress progress-accent bg-blue-gray-100 w-56" value={info?(info.points%250):''} max="250"></progress>
                            </div>
                        </div>
                       
                    </div>
                    <div className="w-full mb-8">
                        <div tabIndex={0} className=" collapse collapse-arrow mb-4 items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <div className=" collapse-title break-words font-bold tracking-tight text-gray-900 dark:text-white">Progress Misi</div>
                            <div className=" collapse-content flex flex-col justify-between leading-normal">
                                <p className="mb-1 break-words  font-light text-gray-700 dark:text-gray-400">Misi mingguan</p>
                                <progress className="progress progress-info bg-blue-gray-100 w-56" value={mission? mission.week : ""} max="7"></progress>
                                <div className="flex flex-row">
                                    <p className=" font-extralight ml-6">1</p>
                                    <p className=" ml-6 font-extralight">2</p>
                                    <p className=" ml-6 font-extralight">3</p>
                                    <p className=" ml-6 font-extralight">4</p>
                                    <p className=" ml-6 font-extralight">5</p>
                                    <p className=" ml-6 font-extralight">6</p>
                                    <p className=" ml-6 font-extralight">7</p>
                                </div>
                                
                                <p className="mb-1 mt-4 break-words  font-light text-gray-700 dark:text-gray-400">Misi bulanan</p>
                                <progress className="progress progress-info bg-blue-gray-100 w-56" value={mission? mission.month : ""} max="4"></progress>
                                <div className="flex flex-row">
                                    <p className=" font-extralight ml-12">1</p>
                                    <p className=" ml-12 font-extralight">2</p>
                                    <p className=" ml-12 font-extralight">3</p>
                                    <p className=" ml-12 font-extralight">4</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" p-3 relative grid place-items-start justify-center gap-2">
                    
                    
                    <h6 className=" text-blue-gray-900 text-xl font-bold">Mau mencoba resto halal apa hari ini?</h6>
                    <div className="w-full">   
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input onChange={(e)=>{setQuery(e.target.value)}} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari resto halal terdekat..."/>
                            <button onClick={search} className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </div>
                    {issearch?result.map((result,index)=>(
                        <div key={result._id}>
                        <a href={'dashboard/'+(index+1)+'?id='+(result._id)+'&user_id='+(user_id)+'&nama='+(result.nama_resto)+'&alamat='+(result.alamat)+'&lat='+(result.lat)+'&lon='+(result.lon)} className=" w-full flex flex-row items-center bg-white border border-gray-200 rounded-full shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <Image className="object-cover ml-2 rounded-full" src="/image/logo_resto.png" alt="" width={100} height={100}/>
                            <div className="flex flex-col justify-between p-4 leading-normal">
                              <p className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">{result.nama_resto}</p>
                              <p className="mb-1 font-light text-gray-700 dark:text-gray-400">{result.alamat}</p>
                            </div>
                        </a>
                      </div>
                    ))
                        :
                    <CardComp/>}
                    {/* <CardComp/> */}
                </div>
            </div>
            {(level!=null&&open)?modal:null}
        </div>
    );
}

