import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";

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
]);