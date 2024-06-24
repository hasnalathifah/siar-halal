import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import NotificationDropdown from "@/components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "@/components/Dropdowns/UserDropdown.js";
import { IconButton } from "@material-tailwind/react";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const router = useRouter();
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden md:bg-white bg-light-blue-600 flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className=" md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-white md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            {/* <i className="fas fa-bars"></i> */}
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          </button>
          {/* Brand */}
          <Link 
              href="/dashboard"
              className=" text-white md:block text-left md:pb-2 ml-4 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold px-0"
            >
             <Image className=" w-auto h-auto" src="/image/logo_siar.png" alt="" width={100} height={20}/>
           
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link href="/dashboard"
                      className=" text-light-blue-900 md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    >
                      <Image className=" w-auto h-auto" src="/image/logo_siar.png" alt="" width={100} height={20}/>
                    
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    {/* <i className="fas fa-times"></i> */}
                    <XMarkIcon strokeWidth={2} className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Divider */}
            {/* <hr className="my-4 md:min-w-full" /> */}
            {/* Heading */}
            {/* <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Admin Layout Pages
            </h6> */}
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link href="/dashboard"
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/dashboard") !== -1
                        ? "text-light-blue-500 hover:text-lightBlue-600"
                        : "text-blue-gray-700 hover:text-blueGray-500")
                    }
                  >
                    <i
                      className={
                        "fas fa-tv mr-2 text-sm " +
                        (router.pathname.indexOf("/dashboard") !== -1
                          ? "opacity-75"
                          : "text-blue-gray-300")
                      }
                    ></i>{" "}
                    Dashboard
                  
                </Link>
              </li>

              <li className="items-center">
                <Link href="/profile"
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/profile") !== -1
                        ? "text-light-blue-500 hover:text-lightBlue-600"
                        : "text-blue-gray-700 hover:text-blueGray-500")
                    }
                  >
                    <i
                      className={
                        "fas fa-tools mr-2 text-sm " +
                        (router.pathname.indexOf("/profile") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Profil
                   
                </Link>
              </li>

              <li className="items-center">
                <Link href="/history"
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/history") !== -1
                        ? "text-light-blue-500 hover:text-lightBlue-600"
                        : "text-blue-gray-700 hover:text-blueGray-500")
                    }
                  >
                    <i
                      className={
                        "fas fa-table mr-2 text-sm " +
                        (router.pathname.indexOf("/history") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Riwayat
                   
                </Link>
              </li>

              <li className="items-center">
                <Link href="/leaderboard"
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/leaderboard") !== -1
                        ? "text-light-blue-500 hover:text-lightBlue-600"
                        : "text-blue-gray-700 hover:text-blueGray-500")
                    }
                  >
                    <i
                      className={
                        "fas fa-map-marked mr-2 text-sm " +
                        (router.pathname.indexOf("/leaderboard") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Leaderboard
                   
                </Link>
              </li>
            </ul>

            {/* <hr className="my-4 md:min-w-full" />

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link href="/owner"
                    className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                  >
                    <i className="fas fa-fingerprint text-blueGray-400 mr-2 text-sm"></i>{" "}
                    Kelola Resto
                   
                </Link>
              </li>
            </ul> */}

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            {/* <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Auth Layout Pages
            </h6> */}
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <button onClick={() => signOut()}
                    className=" text-red-500 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                  >
                    <i className="fas fa-fingerprint text-blueGray-400 mr-2 text-sm"></i>{" "}
                    Log Out
                   
                </button>
              </li>

              {/* <li className="items-center">
                <Link href="/auth/register"
                    className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                  >
                    <i className="fas fa-clipboard-list text-blueGray-300 mr-2 text-sm"></i>{" "}
                    Register
                   
                </Link>
              </li> */}
            </ul>

            

           
          </div>
        </div>
      </nav>
    </>
  );
}
