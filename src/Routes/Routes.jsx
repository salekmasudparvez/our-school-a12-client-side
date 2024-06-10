import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Contact from "../Pages/Contact/Contact";
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
import CreateSession from "../Pages/Dashboard/Teacher/CreateSession/CreateSession";
import ViewAllSessions from "../Pages/Dashboard/Teacher/ViewAllSessions/ViewAllSessions";
import UploadMaterials from "../Pages/Dashboard/Teacher/UploadMaterials/UploadMaterials";
import AllMaterials from "../Pages/Dashboard/Teacher/AllMaterials/AllMaterials";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers/AllUsers";
import AllStudySession from "../Pages/Dashboard/Admin/AllStudySession/AllStudySession";
import ViewAllMaterials from "../Pages/Dashboard/Admin/AllMaterials/ViewAllMaterials";
import AllStudySessionUpdate from "../Pages/Dashboard/Admin/AllStudySession/AllStudySessionUpdate";
import AdminRoutes from "./AdminRoutes";
import TeacherRoutes from "./TeacherRoutes";
import PrivateRoutes from "./PrivateRoutes";
import StudentRoutes from "./StudentRoutes";
import NoneUser from "./NoneUser";
import ViewAllSessionsHome from "../Pages/Home/StudySection/ViewAllSessionsHome";
import AllTutor from "../Pages/Home/Tutors/AllTutor";
import Error from "../Components/Error";




const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement:<Error></Error>,
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
        path: '/details/:id',
        element:<PrivateRoutes><StudySectionDetails></StudySectionDetails></PrivateRoutes> ,
        loader: ({ params }) => fetch(`https://server-study.vercel.app/session/${params.id}`),
      },
      {
        path:'/viewstudysessionshome',
        element:<PrivateRoutes><ViewAllSessionsHome/></PrivateRoutes>,
        loader:()=>fetch('https://server-study.vercel.app/sessionsCount')
      },
      {
        path:'/alltutors',
        element:<PrivateRoutes><AllTutor/></PrivateRoutes>,
        loader:()=>fetch('https://server-study.vercel.app/tutorsCount')
      },
    ],

  },
  {
    path: 'dashboard',
    errorElement:<Error></Error>,
    element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
    children: [
      {
        path: '/dashboard',
        element: <StudentRoutes><BookedSession></BookedSession></StudentRoutes>
      },
      {
        path: '/dashboard/createnote',
        element:<StudentRoutes> <CreateNotes></CreateNotes></StudentRoutes>
      },
      {
        path: '/dashboard/notes',
        element: <StudentRoutes><Notes></Notes></StudentRoutes>
      },
      {
        path: '/dashboard/studymaterials',
        element: <StudentRoutes><StudyMaterials></StudyMaterials></StudentRoutes>,
      },
      {
        path: '/dashboard/reviews/:id',
        element:  <StudentRoutes><Reviews></Reviews></StudentRoutes>,
        loader: ({ params }) => fetch(`https://server-study.vercel.app/reviews/${params.id}`),
      },
      {
        path: '/dashboard/notes/:id',
        element: <StudentRoutes><UpdateNotes></UpdateNotes></StudentRoutes>,
        loader: ({ params }) => fetch(`https://server-study.vercel.app/noteUpdate/${params.id}`),
      },

      // tutor
      {
        path: '/dashboard/tutor',
        errorElement:<Error></Error>,
        element: <TeacherRoutes><CreateSession></CreateSession>  </TeacherRoutes>,
      },
      {
        path: '/dashboard/tutor/ViewAllSessions',
        element: <TeacherRoutes><ViewAllSessions></ViewAllSessions>  </TeacherRoutes>,
      },
      {
        path: '/dashboard/tutor/UploadMaterials',
        element: <TeacherRoutes><UploadMaterials></UploadMaterials> </TeacherRoutes>,
      },
      {
        path: '/dashboard/tutor/allMaterials',
        element: <TeacherRoutes> <AllMaterials></AllMaterials> </TeacherRoutes>,
      },

      //admin
      {
        path: '/dashboard/admin',
        errorElement:<Error></Error>,
        element: <AdminRoutes> <AllUsers></AllUsers></AdminRoutes>,
      },
      {
        path: '/dashboard/admin/allstudysession',
        element: <AdminRoutes><AllStudySession></AllStudySession></AdminRoutes>,
      },
      {
        path: '/dashboard/admin/allmaterials',
        element: <AdminRoutes><ViewAllMaterials></ViewAllMaterials></AdminRoutes>,
      },
      {
        path: '/dashboard/admin/allstudysessionupdate/:id',
        element: <AdminRoutes><AllStudySessionUpdate></AllStudySessionUpdate></AdminRoutes>,
        loader: ({ params }) => fetch(`https://server-study.vercel.app/sessionsDetails/${params.id}`),
      },


    ]
  },
  {
    path: '/singup',
    element: <NoneUser><SingupForm></SingupForm></NoneUser>,
  },
  {
    path: 'singin',
    element: <NoneUser><SinginForm></SinginForm></NoneUser>,

  }
]);

export default Routes