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
import AdminDashboard from './Pages/AdminDashBoard';
import DashboardLayout from './Layout/DashboardLayout';
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
        loader:()=>fetch('http://localhost:5000/instructors')
      },
      {
        path:'/classes',
        element:<Classes></Classes>,
        loader:()=>fetch('http://localhost:5000/classes')
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
        loader:()=>fetch('http://localhost:5000/classes')
      },
      {
        path:'/instructor/dashboard',
        element:<PersonalRouter><InstructorDashboard></InstructorDashboard></PersonalRouter>
      },
      {
        path:'/student/dashboard',
        element:<PersonalRouter><StudentDashboard></StudentDashboard></PersonalRouter>
      },
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
