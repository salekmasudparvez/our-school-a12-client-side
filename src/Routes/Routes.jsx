import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Contact from "../Pages/Contact/Contact";
import About from "../Pages/About/About";
import StudySectionDetails from "../Pages/Home/StudySection/StudySectionDetails";
import SingupForm from "../Pages/AuthenticationForm/SingupForm";
import SinginForm from "../Pages/AuthenticationForm/SinginForm";
import BookedSession from "../Pages/Dashboard/Students/BookedSession/BookedSession";
import DashboardLayout from "../Layout/DashboardLayout";
import CreateNotes from "../Pages/Dashboard/Students/CreateNotes/CreateNotes";
import Notes from './../Pages/Dashboard/Students/Notes/Notes';
import StudyMaterials from './../Pages/Dashboard/Students/StudyMaterials/StudyMaterials';




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
    element: <DashboardLayout></DashboardLayout>,
    children:[
      {
        path:'/dashboard',
        element: <BookedSession></BookedSession>
      },
      {
        path:'/dashboard/createnote',
        element: <CreateNotes></CreateNotes>
      },
      {
        path:'/dashboard/notes',
        element: <Notes></Notes>
      },
      {
        path:'/dashboard/studymaterials',
        element: <StudyMaterials></StudyMaterials>
      },
    ]
  },
  {
    path: '/singup',
    element: <SingupForm></SingupForm>,
  },
  {
    path: 'singin',
    element: <SinginForm></SinginForm>,
    
  }
]);

export default Routes