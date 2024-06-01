import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Routes from './Routes/Routes';
import { ParallaxProvider } from 'react-scroll-parallax';



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   <ParallaxProvider><RouterProvider router={Routes} /></ParallaxProvider> 
  </React.StrictMode>
);