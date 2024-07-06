import type { AppProps } from 'next/app';
import Head from 'next/head';

import '@/shared/styles/globals.css';

import { ApolloProvider } from '@apollo/client';

import DefaultLayout from '@/shared/layouts/DefaultLayout';
import createApolloClient from '@/shared/lib/apolloClient';

const client = createApolloClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>R&M Characters</title>

        <meta name="description" content="Rick and Morty Characters" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <ApolloProvider client={client}>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </ApolloProvider>
    </>
  );
}
