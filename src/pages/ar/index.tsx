import * as React from 'react';

export default function ArPage() {
  // const destLat = JSON.parse(localStorage.getItem("destLat")|| '{}')
  // const destLon = JSON.parse(localStorage.getItem("destLon")|| '{}')

  const destLat = -7.289285
  const destLon = 112.796703

  return (
    <a-scene
      vr-mode-ui='enabled: false'
      arjs='sourceType: webcam; videoTexture: true; debugUIEnabled: false'
      renderer='antialias: true; alpha: true'
    >
      <a-camera gps-new-camera='gpsMinDistance: 5'></a-camera>
      <a-entity
        material='color: red'
        geometry='primitive: box'
        gps-new-entity-place={'latitude: '+destLat+'; longitude: '+destLon}
        scale='10 10 10'
      ></a-entity>

    </a-scene>
  );
}
