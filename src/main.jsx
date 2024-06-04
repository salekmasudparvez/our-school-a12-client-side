import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Routes from './Routes/Routes';
import { ParallaxProvider } from 'react-scroll-parallax';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './AuthProvider/AuthProvider';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


const queryClient = new QueryClient()



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider><ParallaxProvider>
        <RouterProvider router={Routes} />
        <Toaster />
      </ParallaxProvider>
      </AuthProvider>
    </QueryClientProvider>


  </React.StrictMode>
);