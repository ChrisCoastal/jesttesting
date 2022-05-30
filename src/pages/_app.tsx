import '../../styles/globals.css';
import type { AppProps } from 'next/app';

import { Counter } from '../components/Counter';
import { CounterAsync } from '../components/CounterAsync';

function MyApp({ Component, pageProps }: AppProps) {
  return <CounterAsync description="My Counter" defaultCount={0} />;
}

export default MyApp;
