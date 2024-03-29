import * as React from 'react';

export default function ArPage() {
  let destLat, destLon
  if (typeof window !== 'undefined') {
    destLat = JSON.parse(localStorage.getItem("destLat")|| '{}')
    destLon = JSON.parse(localStorage.getItem("destLon")|| '{}')
  }

  // const destLat = -7.289285
  // const destLon = 112.796703

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
                src="assets/location.gltf"
            ></a-asset-item>
        </a-assets>
      <a-entity
        gltf-model= '#location'
        animation-mixer='loop: repeat'
        gps-new-entity-place={'latitude: '+destLat+'; longitude: '+destLon}
        scale='0.6633601288757837 0.6633601288757837 0.6633601288757837'
      ></a-entity>

    </a-scene>
  );
}
