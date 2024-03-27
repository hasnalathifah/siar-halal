"use client";

import { IconButton, Typography } from "@material-tailwind/react";


function Hero() {
  return (
    <div className="relative min-h-screen w-full bg-[url('/image/food-bg.jpg')] bg-cover bg-no-repeat">
    <div className="absolute inset-0 h-full w-full bg-blue-gray-50/80" />
    <div className="grid min-h-screen px-8">
      <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">
        <Typography placeholder={""} variant="h1" color="blue-gray" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          Temukan Restoran Halal <br></br>Dengan Mudah Di Sekitar Anda
        </Typography>
        <Typography
            variant="lead"
            className="mt-4 mb-12 w-full md:max-w-full lg:max-w-3xl text-blue-gray-700"
            placeholder={""} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          Memperkenalkan aplikasi navigasi tempat makan halal dengan teknologi Augmented Reality
        </Typography>
        <a href="/dashboard" type="button" className="relative text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-8 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Mulai sekarang</a>
      </div>
      
    </div>
  </div>
  );
}
export default Hero;