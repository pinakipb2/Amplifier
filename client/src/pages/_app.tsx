import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <main className={`${inter.className}`}>
        <Head>
          <link rel='shortcut icon' href='/fav.ico' />
        </Head>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}
