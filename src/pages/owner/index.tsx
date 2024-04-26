"use client";

import { Form } from "@/components/form";
// import Image from "next/image";
import AdminNavbar from "@/components/admnavbar";
import CardComp from "@/components/cardcomp";
import Sidebarowner from "@/components/sidebarowner";
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
      <>
        <Sidebarowner/>
        {/* <AdminNavbar/> */}
        <div className="relative min-h-screen grid place-items-start justify-center gap-2 ">
          {/* <div className="divide-y divide-blue-gray-100"> */}
          <div className="relative grid mt-8 place-items-center justify-center gap-2">
            
          </div>
        </div>
      </>
    );
}