import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import MyIssues from "../pages/Dashboard/Citizen/MyIssues";
import ReportIssues from "../pages/Dashboard/Citizen/ReportIssues";
import Profile from "../pages/Common/Profile";
import AssignedIssues from "../pages/Dashboard/Staff/AssignedIssues";



export const router = createBrowserRouter([
    {
    path: '/',
    element: <MainLayout/>,
    
    children: [
      {
        path: '/',
        element: <Home />,
      },
     
    ],
    
  },
 { path: '/login', element: <Login /> },
  { path: '/register', element: <Register/> },
  {
    path:'/dashboard',
    element: <PrivateRoute><DashboardLayout/></PrivateRoute>,

    children:[
      {
        path:'my-issues',
        Component:MyIssues

      },
      {
        path:'report-issues',
        Component:ReportIssues
      },
      {
        path:'profile',
        Component:Profile
      },




      {
        path:'/dashboard/assigned-issue',
        element:<AssignedIssues></AssignedIssues>

      }
    ]
  }
]);