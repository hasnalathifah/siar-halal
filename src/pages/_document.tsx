/* eslint-disable @next/next/no-sync-scripts */
import { Head, Html, Main, NextScript } from 'next/document';


export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <script src='https://aframe.io/releases/1.3.0/aframe.min.js'></script>
        <script
          type='text/javascript'
          src='https://raw.githack.com/AR-js-org/AR.js/master/three.js/build/ar-threex-location-only.js'
        ></script>
        <script
          type='text/javascript'
          src='https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js'
        ></script>
        <script src="https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js"></script> 
       
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
