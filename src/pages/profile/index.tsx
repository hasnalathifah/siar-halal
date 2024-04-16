import { Typography } from "@material-tailwind/react"
import Sidebar from "@/components/sidebar"
import Image from "next/image"
import Link from "next/link"


export default function Profile(){
  return(
    <>
      <Sidebar/>
      <div className="relative min-h-screen mt-8 grid place-items-start justify-center gap-2 ">
        {/* <div className="divide-y divide-blue-gray-100"> */}
          <div className="relative grid place-items-center justify-center gap-2">
            <div className=" mt-4 px-5 py-5 w-full flex flex-row place-items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <div className="">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update profil</h2>
              <form action="#">
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
                      <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={"Hasna Lathifah"} placeholder="Nama Lengkap"/>
                  </div>
                  <div className="w-full">
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={"hasna.lathifah03@gmail.com"} placeholder="Email"/>
                  </div>
                  <div className="w-full">
                      <label htmlFor="pass" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="pass" id="pass" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value="Al0homora" placeholder="password"/>
                  </div>
                  <div className="w-full">
                      <label htmlFor="confpass" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Konfirmasi Password</label>
                      <input type="password" name="confpass" id="confpass" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value="Al0homora" placeholder="konfirmasi password"/>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <a href="#" type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800  ">Update Profil</a>
                  <Link href="/dashboard" type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                      Batal
                  </Link>
                </div>
              </form>
              </div>
            </div>
          </div>
        {/* </div> */}
      </div>
    </>
  )
}