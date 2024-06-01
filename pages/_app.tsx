import '@/styles/globals.css'
import {Inter,Quicksand} from "next/font/google"
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import type { AppProps } from 'next/app'
import {GoogleOAuthProvider} from "@react-oauth/google"
import   { Toaster } from 'react-hot-toast';



const inter = Inter({subsets:["latin"]});
const quicksand = Quicksand ({subsets:["latin"]});

const queryClient = new QueryClient();
 

export default function App({ Component, pageProps }: AppProps) {
  return (
  <div className={inter.className}>
    <QueryClientProvider client={queryClient}>
  <GoogleOAuthProvider clientId="739932453001-d02cag8bl6thphlggmvuhps7p8funssu.apps.googleusercontent.com">
  <Component {...pageProps} />
  <Toaster/>
  <ReactQueryDevtools/>
  </GoogleOAuthProvider>
  </QueryClientProvider>
  </div>
  )
}
