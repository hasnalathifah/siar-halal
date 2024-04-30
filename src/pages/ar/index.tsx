import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
// import {lookAt} from '@/pages/ar/component/look-at';

type ent = {
  lat: any,
  lon: any,
  id: string,
  look_at: string,
  model: string,
  scale: any
}




export default function ArPage() {
  let get, latlon
  let lat,lon
  const router = useRouter();
  // function push (){
  //   router.push('/dashboard');
  // }
  
  const entref = useRef()
  let finish = entref.current
  
  finish.addEventListener("click", (e: { currentTarget: any; }) => {
    router.push('/dashboard');
  });
  // let latitude, longitude, id, target, model
  // let Lat = []
  // let Lon = []
  // if (typeof window !== 'undefined') {
  //   Lat = JSON.parse(localStorage.getItem("lat")|| '{}')
  //   Lon = JSON.parse(localStorage.getItem("lon")|| '{}')
  // }
 
  const seachParams = useSearchParams()
  get = seachParams.get('str')
  console.log(get)
  latlon = JSON.parse(get)
  // // if (data !== null) latlon = JSON.parse(data)

  // // console.log(lat[length-1])

  const [currlat, setCurrlat] = useState();
    const [currlon, setCurrlon] = useState();

    useEffect(() => {
        if('geolocation' in navigator) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.watchPosition(({ coords }) => {
                const lat = coords.latitude;
                const lon = coords.longitude
                setCurrlat(lat);
                setCurrlon(lon)
            })
        }
    }, []);

  let list = []
  // let scene = document.querySelector('a-scene');
  lat = -7.289226
  lon = 112.797000
  if(latlon != null){
    lat = latlon.lat;
    lon = latlon.lon;
  }
  
  console.log(lat);
  console.log(lon);
  let nav = []
  let idloc
 

  for (let i = lat.length-1; i > -1; i--) {
      let latitude = lat[i];
      let longitude = lon[i];
      console.log(latitude);
      console.log(longitude);
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
        const position = "0 0 0"
        list.push(
          <a-entity ref={entref} gps-new-entity-place={'latitude:'+latitude+'; longitude:'+longitude} id={id} look-at={target} gltf-model={model} animation-mixer='loop-repeat' scale={scale}>
            <a-entity look-at={target} gltf-model={'#finish'}  animation-mixer='loop-repeat' scale={scale}>
            </a-entity>
          </a-entity>
        )
        console.log(id)
      }
      
       
      
      // let model = document.createElement('a-entity');
      // model.setAttribute('gps-new-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
      // // model.setAttribute('material', { color: 'blue' } );
      // model.setAttribute('look-at', '[gps-new-camera]');
      // let id = 'target'+i;
      // let target = '#target'+(i+1);
      // model.setAttribute('id', id);
      // if (i != lat.length-1) {
      //     model.setAttribute('look-at', target);
      //     console.log(id);
      //     console.log(target);
      //     model.setAttribute('gltf-model', '#arrow');
      // } 
      // else{
      //     model.setAttribute('gltf-model', '#location');
      // }
      // model.setAttribute('animation-mixer', 'loop: repeat');
      // model.setAttribute('scale', '0.6633601288757837 0.6633601288757837 0.6633601288757837');
      // model.addEventListener('loaded', () => {
      //     window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
      // });
      // scene.appendChild(model);
  };
  nav.push(
    <a-entity gps-new-entity-place={"latitude:"+currlat+" ; longitude:"+currlon} position='0 0 10' id="nav" look-at={'#target'+idloc} gltf-model={'#panah'} animation-mixer='loop-repeat' scale={'0.3 0.3 0.3'}>
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
            <a-asset-item id="panah" src="assets/arrow.glb"></a-asset-item>
          </a-assets>
        {list} 
        {nav}
      </a-scene>
    </body>
  );
}
