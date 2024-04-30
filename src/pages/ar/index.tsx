'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import Link from 'next/link';
// import {lookAt} from '@/pages/ar/component/look-at';


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
  let get, latlon
  let lat,lon
  const router = useRouter();
  // function push (){
  //   router.push('/dashboard');
  // }
  // let latitude, longitude, id, target, model
  // let Lat = []
  // let Lon = []
  // if (typeof window !== 'undefined') {
  //   Lat = JSON.parse(localStorage.getItem("lat")|| '{}')
  //   Lon = JSON.parse(localStorage.getItem("lon")|| '{}')
  // }
 
  const seachParams = useSearchParams()
  get = seachParams.get('str')
  // console.log(get)
  latlon = JSON.parse(get)
  let list = []
  // let scene = document.querySelector('a-scene');
  lat = -7.289226
  lon = 112.797000
  if(latlon != null){
    lat = latlon.lat;
    lon = latlon.lon;
  }
  
  // console.log(lat);
  // console.log(lon);
  let nav = []
  let idloc, dlat: any, dlon: any, dist
 
  // // if (data !== null) latlon = JSON.parse(data)

  // // console.log(lat[length-1])

  const [currlat, setCurrlat] = useState();
  const [currlon, setCurrlon] = useState();

  for (let i = lat.length-1; i > -1; i--) {
      let latitude = lat[i];
      let longitude = lon[i];
      // console.log(latitude);
      // console.log(longitude);
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
            <a-entity look-at={target} gltf-model={'#finish'}  animation-mixer='loop-repeat' scale={scale}>
            </a-entity>
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

let info , finish 
dist = distance(Number(currlat),  Number(dlat), Number(currlon), Number(dlon))
console.log(dist)
info = <div className=' text-xl text-black'>dist = {decimalAdjust("round", dist, -2)} meters</div>


if(dist < 100){
  finish=<Link href='/dashboard' type='button' className=' text-center relative w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-8 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none mt-96'>Selesai</Link>

}

console.log(currlat)

  nav.push(
    <a-entity gps-new-entity-place={"latitude:"+currlat+" ; longitude:"+currlon} position='20 0 0' id="nav" look-at={'#target'+idloc} gltf-model={'#panah'} animation-mixer='loop-repeat' scale={'0.1 0.1 0.1'}>
        </a-entity>
  )

  return (
    <body>
      <a-scene
        vr-mode-ui='enabled: false' 
        arjs='sourceType: webcam; videoTexture: true; debugUIEnabled: false' 
        renderer='antialias: true; alpha: true'>
          <a-camera gps-new-camera='gpsMinDistance: 5; gpsTimeInterval: 0'></a-camera>
          <a-assets>
            <a-asset-item id="arrow" src="assets/direction.glb"></a-asset-item>
            <a-asset-item id="location" src="/assets/location.gltf"></a-asset-item>
            <a-asset-item id="finish" src="/assets/finish.glb"></a-asset-item>
            <a-asset-item id="panah" src="assets/carArrow.glb"></a-asset-item>
          </a-assets>
        {list} 
        {nav}
      </a-scene>
      <div className='relative grid justify-center items-center'>
        <div className=''>{info}</div>
        <div className=' justify-center items-center'>{finish}</div>
      </div>
    </body>
  );
}
