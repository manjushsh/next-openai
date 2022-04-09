import type { AppProps } from 'next/app';
import '../styles/globals.css';
import '../styles/login.css';
import '../styles/chat.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
