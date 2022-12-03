import type { AppProps } from "next/app";
import { GlobalStateProvider } from "../context/common-state";
import "../styles/globals.css";
import "../styles/login.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStateProvider>
        <Component {...pageProps} />
      </GlobalStateProvider>
    </>
  );
}

export default MyApp;
