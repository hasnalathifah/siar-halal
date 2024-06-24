import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
// import "leaflet/dist/leaflet.css"
import type { AppProps } from "next/app";
// import {lookAt} from '@/components/LookAt/look-at'

export default function App({ Component, pageProps : {session, ...pageProps} }: AppProps) {

  return <SessionProvider session={session}>
            <Component {...pageProps} />;
          </SessionProvider> 
}
