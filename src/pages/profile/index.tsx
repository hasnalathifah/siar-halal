import { Typography } from "@material-tailwind/react"
import Sidebar from "@/components/sidebar"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react";
import {useRouter} from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";


export default function Profile(){
  const { data }: any = useSession();
  const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [user, setUser] = React.useState({
        nama: "",
        email: "",
        password: "",
        password2: ""
    })

      const onUpdate = async () => {
        try {
            const password = user.password
            const password2 = user.password2
            setLoading(true);
            // const response = await 
            // console.log(response)
            if (password != password2){
              alert("password tidak sesuai")
            }
            else {
              let id = data.user._id
              let nama = user.nama
              let email = user.email
              let pwd = user.password
              if(nama == "") nama = data.user.nama
              if(email == "") email = data.user.email
              if(pwd == "") pwd = data.user.pwd
              console.log({id, nama, email, pwd})
              const response = await axios.post("/api/users/update", {id,nama,email,pwd});
              console.log(response)
              if (response.status == 200 )router.refresh();
            }
            
        } catch (error:any) {
            console.log("Login failed", error.message);
            
        }finally {
            setLoading(false);
        }
    }
    const [finduser, setfindUser] = useState(Object);
    const [mission, setMission] = useState(Object);
    useEffect(()=>{
        async function getUser() {
            if(data){
                try {
                    const id = data.user._id
                    const response = await axios.post("/api/users/find", {id});
                    if (response) {
                        setfindUser (response.data)
                        setMission(response.data.gamification.mission)
                    }
                    else console.log("null")
                } catch (e) {
                    console.log("error");
                }
            }
            else console.log("kosong")
        }getUser()
    }, [data, finduser])
  return(
    <div className="min-h-screen bg-light-blue-50">
      <Sidebar/>
      <div className="relative min-h-screen grid place-items-start justify-center gap-2 ">
        {/* <div className="divide-y divide-blue-gray-100"> */}
          <div className="relative grid mt-8 place-items-center justify-center gap-2">
            <div className=" mt-4 px-5 py-5 w-full flex flex-row place-items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <div className="">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update profil</h2>
              <div>
                {/* <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update profil</h2> */}
                <div className="avatar">
                  <div className="w-24 rounded-full">
                    <Image src="/image/food-bg.jpg" width={96} height={96} alt={""} />
                  </div>
                </div>
                <div className="mt-4">
                  <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file"/>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">{'SVG, PNG, JPG or GIF (MAX. 800x400px).'}</p>
                <div className="grid gap-4 mt-8 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                  <div className="w-full">
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Lengkap</label>
                      <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={user.nama} onChange={(e) => setUser({...user, nama: e.target.value})} placeholder={finduser?finduser.nama:""}/>
                  </div>
                  <div className="w-full">
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} placeholder={finduser?finduser.email:""}/>
                  </div>
                  <div className="w-full">
                      <label htmlFor="pass" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ubah Password</label>
                      <input type="password" name="pass" id="pass" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={""} onChange={(e) => setUser({...user, password: e.target.value})} placeholder="••••••••"/>
                  </div>
                  <div className="w-full">
                      <label htmlFor="confpass" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Konfirmasi Password</label>
                      <input type="password" name="confpass" id="confpass" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={""} onChange={(e) => setUser({...user, password2: e.target.value})} placeholder="••••••••"/>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button onClick={onUpdate} className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800  ">Update Profil</button>
                  <Link href="/dashboard" type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                      Batal
                  </Link>
                </div>
              </div>
              </div>
            </div>
            <div className=" mt-4 mb-8 w-full flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <div className="flex flex-col justify-between p-4 leading-normal">
                  <p className="mb-2 break-words font-bold tracking-tight text-gray-900 dark:text-white">Progress Misi</p>
                  <p className="mb-1 break-words  font-light text-gray-700 dark:text-gray-400">Misi mingguan</p>
                  <progress className="progress progress-accent w-56" value={mission?mission.week : ""} max="7"></progress>
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
                  <progress className="progress progress-accent w-56" value={mission?mission.month : ""} max="4"></progress>
                  <div className="flex flex-row">
                    <p className=" font-extralight ml-12">1</p>
                    <p className=" ml-12 font-extralight">2</p>
                    <p className=" ml-12 font-extralight">3</p>
                    <p className=" ml-12 font-extralight">4</p>
                  </div>
              </div>
            </div>  
          </div>
        {/* </div> */}
      </div>
    </div>
  )
}