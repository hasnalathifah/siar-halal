import Image from "next/image";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [user, setUser] = React.useState({
        nama:"",
        email: "",
        password: "",
        password2:""
    })

      const onSignup = async () => {
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
              const response = await axios.post("/api/users/register", user);
              console.log(response)
              if (response.status == 200 )router.push("/login");
            }
            
        } catch (error:any) {
            console.log("Login failed", error.message);
            
        }finally {
            setLoading(false);
        }
    }
  return (
    <div className=" relative min-h-screen w-full bg-[url('/image/food-bg.jpg')]">
      <div className=" bg-blue-gray-50/80 min-h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              {/* <Image width={20} height={20} className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/> */}
              <Image className=" w-auto h-auto" src="/image/logo_navbar.png" alt="" width={150} height={30}/>     
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Sign Up
                  </h1>
                  <div className="space-y-4 md:space-y-6">
                      <div>
                          <label htmlFor="Name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                          <input type="text" name="name" id="Name" value={user.nama} onChange={(e) => setUser({...user, nama: e.target.value})} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Name" required/>
                      </div>
                      <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                          <input type="email" name="email" id="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required/>
                      </div>
                      <div>
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input type="password" name="password" id="password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                      </div>
                      <div>
                          <label htmlFor="password2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                          <input type="password" name="password2" id="password2" value={user.password2} onChange={(e) => setUser({...user, password2: e.target.value})} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                      </div>
                      <button onClick={onSignup} className="w-full text-white bg-light-blue-600 hover:bg-light-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign Up</button>
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                          Already have an account? <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Log In</Link>
                      </p>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}