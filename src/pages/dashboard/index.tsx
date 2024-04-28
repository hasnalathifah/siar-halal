"use client";

import { Form } from "@/components/form";
// import Image from "next/image";
import AdminNavbar from "@/components/admnavbar";
import CardComp from "@/components/cardcomp";
import Sidebar from "@/components/sidebar";
import { Input, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
// import Card from "@/components/card";
// import { getResto } from "../lib/data";

// async function CardComp() {
//     const resto = await getResto()
//     return(
//         <Card resto = {resto}/>
//     );
// }

export default function Dashboard() {

    return (
        <div className=" bg-blue-gray-50">
            <Sidebar/>
            {/* <AdminNavbar/> */}
            <div className="relative grid place-items-start justify-center gap-2">
                <div className="relative grid place-items-start justify-center gap-2">
                <div className="relative mt-8 flex flex-col items-center justify-center gap-4 min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <h6 className="text-blueGray-700 text-xl font-bold">Selamat Datang!</h6>
                    <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row">
                        <div className="w-80">
                            {/* @ts-ignore */}
                            <Input 
                            label="Lokasi anda saat ini" 
                            placeholder="Lokasi saat ini"
                            // value={"Perum ITS Jl. Teknik Sipil W20"} 
                            />
                        </div>
                        <Button placeholder={"Pilih lokasi"} size="md" className="lg:w-max shrink-0" fullWidth color="blue" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        Pilih lokasi
                        </Button>
                    </div>
                    </div>
                </div>
                    <form className="w-full">   
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari resto halal terdekat..."/>
                            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </form>
                    <CardComp/>
                </div>
            </div>
        </div>
    );
}