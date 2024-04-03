import * as React from 'react';
import { useRouter } from 'next/router'


export default function ArPage() {
  let destLat, destLon
  let Lat = []
  let Lon = []
  if (typeof window !== 'undefined') {
    Lat = JSON.parse(localStorage.getItem("lat")|| '{}')
    Lon = JSON.parse(localStorage.getItem("lon")|| '{}')
  }
  // const router = useRouter();
  // const data = router.query;
  // const lat = data.lat
  // const lon = data.lon
  const length = Lat.length
  // // if (data !== null) latlon = JSON.parse(data)

  // // console.log(lat[length-1])

  destLat = Lat[length-1]
  destLon = Lon[length-1]
  console.log(destLat, destLon)


  return (
    <a-scene
      vr-mode-ui='enabled: false'
      arjs='sourceType: webcam; videoTexture: true; debugUIEnabled: false'
      renderer='antialias: true; alpha: true'
    >
      <a-camera gps-new-camera='gpsMinDistance: 5'></a-camera>
      <a-assets>
            {/* <a-asset-item
                id="arrow"
                src="assets/arrow.glb"
            ></a-asset-item> */}
            <a-asset-item
                id="location"
                src="/assets/location.gltf"
            ></a-asset-item>
        </a-assets>
      <a-entity
        gltf-model= '#location'
        animation-mixer='loop: repeat'
        gps-new-entity-place={'latitude: '+destLat+'; longitude: '+destLon}
        scale='1 1 1'
      ></a-entity>

    </a-scene>
  );
}
