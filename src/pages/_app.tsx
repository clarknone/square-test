import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script src="https://sandbox.web.squarecdn.com/v1/square.js" />
      <Component {...pageProps} />
    </>
  );
}
