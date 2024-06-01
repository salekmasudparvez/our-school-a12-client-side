import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Contact from "../Pages/Contact/Contact";
import About from "../Pages/About/About";
import Dashboard from "../Pages/Dashboard/DashBoard/Dashboard";
import StudySectionDetails from "../Pages/Home/StudySection/StudySectionDetails";



const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/contact',
        element: <Contact></Contact>
      },
      {
        path: '/about',
        element: <About></About>
      },
      {
        path: '/details',
        element: <StudySectionDetails></StudySectionDetails>
      },
    ],

  },
  {
    path: 'dashboard',
    element: <Dashboard></Dashboard>,
  }
]);

export default Routes