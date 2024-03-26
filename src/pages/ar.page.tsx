import * as React from 'react';

export default function ArPage() {
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
        gps-new-entity-place='latitude: -7.28936; longitude: 112.80233'
        scale='10 10 10'
      ></a-entity>
    </a-scene>
  );
}
