import "@/styles/globals.css";
// import "leaflet/dist/leaflet.css"
import type { AppProps } from "next/app";
import {lookAt} from '@/components/LookAt/look-at'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
