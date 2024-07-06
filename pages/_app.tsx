import type { AppProps } from "next/app";
import { Open_Sans } from "next/font/google";
import Head from "next/head";

import "@/shared/styles/globals.css";

const opensans = Open_Sans({ subsets: ["latin"] });

import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import DefaultLayout from "@/shared/layouts/DefaultLayout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      retryOnMount: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>R&M Characters</title>

        <meta name="description" content="Rick and Morty Characters" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        </HydrationBoundary>
        <ReactQueryDevtools initialIsOpen={false} position="right" />
      </QueryClientProvider>
    </>
  );
}
