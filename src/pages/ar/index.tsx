'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
// import {lookAt} from '@/pages/ar/component/look-at';

// if (typeof window != undefined){
//   window.onload=()=>{
//     ArPage()
//   }
// }

function getSign(n: number){
  let sign
  if(n == 0) sign = "continue"
  else if(n==2)sign = "turn right"
  else if(n==-2) sign = "turn left"
  else if(n==4) sign = "Arrived"
  return sign
}

function getIcon(n: number){
  let sign
  if(n == 0) sign = <svg fill="none" height="24" viewBox="0 0 48 48" width="24" transform='rotate(-90)' xmlns="http://www.w3.org/2000/svg"><path d="m0 0h48v48h-48z" fill="#fff" fill-opacity=".01"/><g stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"><path d="m41.9999 24h-35.99998"/><path d="m30 12 12 12-12 12"/></g></svg>
  else if(n==2)sign = <svg fill="none" height="24" viewBox="0 0 24 24" width="24" transform='scale(-1,1)' xmlns="http://www.w3.org/2000/svg"><g stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m8 5-5 5 5 5"/><path d="m3 10h8c5.5228 0 10 4.4772 10 10v1"/></g></svg>
  else if(n==-2) sign = <svg fill="none" height="24" viewBox="0 0 24 24" width="24" transform='scale(1,1)' xmlns="http://www.w3.org/2000/svg"><g stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m8 5-5 5 5 5"/><path d="m3 10h8c5.5228 0 10 4.4772 10 10v1"/></g></svg>
  else if(n==4) sign = <svg height="30" viewBox="0 0 21 21" width="30" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" transform="translate(4 2) scale(1.1,1.1)"><path d="m6.5 16.5407715c4-4.4500928 6-7.78586659 6-10.00732153 0-3.33218241-2.6862915-6.03344997-6-6.03344997s-6 2.70126756-6 6.03344997c0 2.22145494 2 5.55722873 6 10.00732153z"/><circle cx="6.5" cy="6.5" r="2.5"/></g></svg>
  return sign
}

function distance(lat1: number,
  lat2: number, lon1: number, lon2: number)
{
  console.log('dlat on distance : '+lat2)

// The math module contains a function
// named toRadians which converts from
// degrees to radians.
lon1 =  lon1 * Math.PI / 180;
lon2 = lon2 * Math.PI / 180;
lat1 = lat1 * Math.PI / 180;
lat2 = lat2 * Math.PI / 180;

// Haversine formula 
let dlon = lon2 - lon1; 
let dlat = lat2 - lat1;
let a = Math.pow(Math.sin(dlat / 2), 2)
+ Math.cos(lat1) * Math.cos(lat2)
* Math.pow(Math.sin(dlon / 2),2);

let c = 2 * Math.asin(Math.sqrt(a));

console.log('c : '+c)

// Radius of earth in kilometers. Use 3956 
// for miles
let r = 6371;

// calculate the result
return(c*10000000);
}

function decimalAdjust(type: string, value: unknown, exp: number) {
  type = String(type);
  if (!["round", "floor", "ceil"].includes(type)) {
    throw new TypeError(
      "The type of decimal adjustment must be one of 'round', 'floor', or 'ceil'.",
    );
  }
  exp = Number(exp);
  value = Number(value);
  if (exp % 1 !== 0 || Number.isNaN(value)) {
    return NaN;
  } else if (exp === 0) {
    return Math[type](value);
  }
  const [magnitude, exponent = 0] = value.toString().split("e");
  const adjustedValue = Math[type](`${magnitude}e${exponent - exp}`);
  // Shift back
  const [newMagnitude, newExponent = 0] = adjustedValue.toString().split("e");
  return Number(`${newMagnitude}e${+newExponent + exp}`);
}

export default function ArPage() {
  const [currlat, setCurrlat] = useState();
  const [currlon, setCurrlon] = useState();
  const [invrange, setInvrange] = useState(Number);

  let get, latlon, data, inv, sign, ins, mode
  let lat,lon

  const seachParams = useSearchParams()
  get = seachParams.get('str')
  lat = -7.289226
  lon = 112.797000
  inv = [0, 0]
  sign = 0
  data = JSON.parse(get)

  let list = []
 
  if(data !== null){
    lat = data.latlon.lat;
    lon = data.latlon.lon;
    ins = data.ins
    mode = data.mode
  }
  else{
    latlon = {lat, lon}
    ins = {inv, sign}
  }
  
  // console.log(lat);
  // console.log(lon);
  let nav = []
  let idloc, dlat: any, dlon: any, dist, pointlat=[], pointlon = []


  for (let i = lat.length-1; i > -1; i--) {
      let latitude = lat[i];
      let longitude = lon[i];
      // console.log(latitude);
      // console.log(longitude);
      for (let j = ins.inv.length-1; j > -1; j--) {
        if(i == ins.inv[j][0]){
          pointlat[j] = lat[i]
          pointlon[j] = lon[i]
          console.log(lat[i])
        }
        
      }
      let id = 'target'+i
      let target, model 
      let scale = '0.5 0.5 0.5'
      if (i != lat.length-1) {
        target = '#target'+(i+1)
        model = '#arrow'
        list.push(
          <a-entity gps-new-entity-place={'latitude:'+latitude+'; longitude:'+longitude} id={id} look-at={target} gltf-model={model} animation-mixer='loop-repeat' scale={scale}>
            </a-entity>
        )
      }
      else {
        target = '[gps-new-camera]'
        model = '#location'
        idloc = i
        dlat = latitude
        dlon = longitude
        list.push(
          <a-entity gps-new-entity-place={'latitude:'+latitude+'; longitude:'+longitude} id={id} look-at={target} gltf-model={model} animation-mixer='loop-repeat' scale={scale}>
          </a-entity>
        )
        // console.log(id)
      }
      
  };
  console.log('dlat: '+dlat)
  useEffect(() => {
    if('geolocation' in navigator) {
        // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
        navigator.geolocation.watchPosition(({ coords }) => {
            const srclat = coords.latitude;
            const srclon = coords.longitude
            setCurrlat(srclat);
            setCurrlon(srclon);
            console.log(coords.latitude)
        })
    }
}, [dlat, dlon]);



let info , finish, dir, dist_ins, back = []

back.push(
  <a href={"https://hadziq.8thwall.app/siarhalal?destlat=" + dlat + "&destlon=" + dlon + "&mode=" + mode} className=" card mt-4 bg-red-800 opacity-80 border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <div className="card-body items-center text-center p-2">  
      {/* <div className=' justify-center items-center'>{getIcon(ins.sign[invrange])}</div>
      <p className="break-words tracking-tight text-gray-100 dark:text-white">{getSign(ins.sign[invrange])}</p> */}
      <p className="break-words tracking-tight text-gray-100 dark:text-white">Kembali ke map</p>
    </div>
  </a>
)

dist = distance(Number(currlat),  Number(dlat), Number(currlon), Number(dlon))
console.log(dist)
info = <div className="mt-4 justify-center items-center bg-blue-gray-800 opacity-80 border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
  <div className="flex justify-center items-center p-2 leading-normal">
    <div className='pr-1'><svg height="20" viewBox="0 0 21 21" width="20" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" transform="translate(4 2) scale(1.1,1.1)"><path d="m6.5 16.5407715c4-4.4500928 6-7.78586659 6-10.00732153 0-3.33218241-2.6862915-6.03344997-6-6.03344997s-6 2.70126756-6 6.03344997c0 2.22145494 2 5.55722873 6 10.00732153z"/><circle cx="6.5" cy="6.5" r="2.5"/></g></svg></div>
    <p className="break-words tracking-tight text-gray-100 dark:text-white">{decimalAdjust("round", dist, -2)} m</p>
  </div>
</div>

if(dist < 20){
  finish= <div className=" mt-72 w-full flex flex-row items-center bg-blue-gray-700 opacity-90 border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
  <div className="flex flex-col justify-between p-4 leading-normal">
      <p className=" mb-2 break-words font-bold tracking-tight text-gray-100 dark:text-white">Anda telah sampai di tujuan</p>
      <Link href='/dashboard' type='button' className=' text-center relative text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none'>Selesai</Link>
  </div>
</div>
}


if (invrange==null || invrange==undefined){
  setInvrange(0)
}
dist_ins = distance(Number(currlat),  Number(pointlat[invrange]), Number(currlon), Number(pointlon[invrange]))
dir = <div className=" card mt-4 bg-blue-gray-800 opacity-80 border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
  <div className="card-body items-center text-center p-2">  
    <div className=' justify-center items-center'>{getIcon(ins.sign[invrange])}</div>
    <p className="break-words tracking-tight text-gray-100 dark:text-white">{getSign(ins.sign[invrange])}</p>
    <p className="break-words tracking-tight text-gray-100 dark:text-white">{decimalAdjust("round", dist_ins, -2)} m</p>
  </div>
</div>

if(dist_ins <= 15){
  setInvrange(invrange+1)
  dist_ins = distance(Number(currlat),  Number(pointlat[invrange]), Number(currlon), Number(pointlon[invrange]))
  dir = <div className="mt-4 justify-center items-center bg-blue-gray-800 opacity-80 border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
  <div className="grid justify-center items-center p-2 leading-normal">
  <div className=' justify-center items-center'>{getIcon(ins.sign[invrange])}</div>
    <p className="break-words tracking-tight text-gray-100 dark:text-white">{getSign(ins.sign[invrange])}</p>
    <p className="break-words tracking-tight text-gray-100 dark:text-white">{decimalAdjust("round", dist_ins, -2)} m</p>
  </div>
</div>
}

  nav.push(
    <a-entity gps-new-entity-place={"latitude:"+currlat+" ; longitude:"+currlon} position='15 0 0' id="nav" look-at={'#target'+idloc} gltf-model={'#panah'} animation-mixer='loop-repeat' scale={'0.1 0.1 0.1'}>
        </a-entity>
  )

  return (
    <body>
      <a-scene
        vr-mode-ui='enabled: false' 
        arjs='sourceType: webcam; videoTexture: true; debugUIEnabled: false' 
        renderer='antialias: true; alpha: true'>
          <a-camera far='50' gps-new-camera='maxDistance: 50; gpsMinDistance: 0; gpsTimeInterval: 0'></a-camera>
          <a-assets>
            <a-asset-item id="arrow" src="assets/direction.glb"></a-asset-item>
            <a-asset-item id="location" src="/assets/location.gltf"></a-asset-item>
            <a-asset-item id="finish" src="/assets/finish.glb "></a-asset-item>
            <a-asset-item id="panah" src="assets/carArrow.glb"></a-asset-item>
          </a-assets>
        {list} 
        {nav}
      </a-scene>
      <div className=' grid grid-cols-6 justify-center items-center gap-4'>
        <div className=' col-start-1 col-span-2 justify-center items-center ml-2'>{dir}</div>
        <div className=' col-start-1 col-span-2 justify-center items-center ml-2'>{info}</div>
        <div className=' col-start-1 col-span-2 justify-center items-center ml-2'>{back}</div>
      </div>
      <div className='relative grid justify-center items-center'>
        <div className=' justify-center items-center'>{finish}</div>
      </div>
    </body>
  );
}


