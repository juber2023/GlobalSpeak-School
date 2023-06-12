import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './Layout/Layout';
import ErrorPage from './CommonPages/ErrorPage';
import Home from './Home/Home';
import ContextApi from './Auth/ContextApi';
import Register from './Auth/Register';
import Login from './Auth/Login';
import Instructors from './Pages/Instructors';
import Classes from './Pages/Classes';
import AdminDashBoard from './Pages/AdminDashBoard';
import InstructorDashboard from './Pages/InstructorDashboard';
import StudentDashboard from './Pages/StudentDashboard';
import PersonalRouter from './Auth/PersonalRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DashboardLayout from './Layout/DashboardLayout';
import Payment from './Pages/Payment';
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path:'/register',
        element:<Register></Register>
      },
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/instructors',
        element:<Instructors></Instructors>,
        loader:()=>fetch('https://server-12-foreign-langauage.vercel.app/users')
      },
      {
        path:'/classes',
        element:<Classes></Classes>,
        loader:()=>fetch('https://server-12-foreign-langauage.vercel.app/classes')
      },
    ]
  },
  {
    path:'/',
    element: <DashboardLayout></DashboardLayout>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        path:'/admin/dashboard',
        element:<PersonalRouter><AdminDashBoard></AdminDashBoard></PersonalRouter>,
        // loader:()=>fetch('https://server-12-foreign-langauage.vercel.app/classes')
      },
      {
        path:'/instructor/dashboard',
        element:<PersonalRouter><InstructorDashboard></InstructorDashboard></PersonalRouter>,
        loader:()=>fetch('https://server-12-foreign-langauage.vercel.app/classes')
      },
      {
        path:'/student/dashboard',
        element:<PersonalRouter><StudentDashboard></StudentDashboard></PersonalRouter>,
        loader:()=>fetch('https://server-12-foreign-langauage.vercel.app/enroll')
      },
      {
        path: '/payment/:id',
        element: <div className='w-2/6 mx-auto mt-10'><Payment></Payment></div>,
        loader:({params})=>fetch(`https://server-12-foreign-langauage.vercel.app/payment/${params.id}`)
      }
    ]
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextApi>
      <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
      </QueryClientProvider>
    </ContextApi>
  </React.StrictMode>,
)
