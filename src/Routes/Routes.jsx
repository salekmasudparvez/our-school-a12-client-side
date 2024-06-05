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
import Reviews from "../Pages/Dashboard/Students/BookedSession/Reviews";
import UpdateNotes from "../Pages/Dashboard/Students/Notes/UpdateNotes";
import CreateSession from "../Pages/Dashboard/Students/Teacher/CreateSession/CreateSession";
import ViewAllSessions from "../Pages/Dashboard/Students/Teacher/ViewAllSessions/ViewAllSessions";
import UploadMaterials from "../Pages/Dashboard/Students/Teacher/UploadMaterials/UploadMaterials";




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
        path: '/details/:id',
        element: <StudySectionDetails></StudySectionDetails>,
        loader:({params})=>fetch(`http://localhost:5000/sessions${params.id}`),
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
      {
        path:'/dashboard/reviews/:id',
        element: <Reviews></Reviews>,
        loader:({params})=>fetch(`http://localhost:5000/reviews/${params.id}`),
      },
      {
        path:'/dashboard/notes/:id',
        element: <UpdateNotes></UpdateNotes>,
        loader:({params})=>fetch(`http://localhost:5000/noteUpdate/${params.id}`),
      },

      // tutor
      {
        path:'/dashboard/tutor',
        element: <CreateSession></CreateSession>,
      },
      {
        path:'/dashboard/tutor/ViewAllSessions',
        element: <ViewAllSessions></ViewAllSessions>,
      },
      {
        path:'/dashboard/tutor/UploadMaterials',
        element: <UploadMaterials></UploadMaterials>,
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