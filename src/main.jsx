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
      {
        path:'/admin/dashboard',
        element:<PersonalRouter><AdminDashBoard></AdminDashBoard></PersonalRouter>
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
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextApi>
    <RouterProvider router={router} />
    </ContextApi>
  </React.StrictMode>,
)
