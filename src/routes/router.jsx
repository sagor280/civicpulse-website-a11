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
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";
import PaymentSuccessBoosting from "../pages/Dashboard/Payment/PaymentSuccessBoosting";
import LoadingSpinner from "../Component/LoadingSpinner/LoadingSpinner";
import AdminOverview from "../pages/Dashboard/Admin/AdminOverview";
import AdminAllIssues from "../pages/Dashboard/Admin/AdminAllIssues";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageSraff from "../pages/Dashboard/Admin/ManageSraff";
import Payment from "../pages/Dashboard/Admin/Payment";
import AdminProfile from "../pages/Common/AdminProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),

    children: [
      {
        path: "my-issues",
        Component: MyIssues,
        loader: () => fetch("/catagory.json").then((res) => res.json()),
        hydrateFallbackElement: <LoadingSpinner />,
      },
      {
        path: "report-issues",
        Component: ReportIssues,
        loader: () => fetch("/catagory.json").then((res) => res.json()),
        hydrateFallbackElement: <LoadingSpinner />,
      },
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "payment-success-boosting",
        element: <PaymentSuccessBoosting></PaymentSuccessBoosting>,
      },
      {
        path: "payment-cancelled",
        element: <PaymentCancelled></PaymentCancelled>,
      },

      {
        path: "/dashboard/assigned-issue",
        element: <AssignedIssues></AssignedIssues>,
      },
      // admin only routes
      {
        path:"/dashboard/overview",
        element:<AdminOverview></AdminOverview>
      },
      {
        path:"/dashboard/all-issues",
        element:<AdminAllIssues></AdminAllIssues>
      },
      {
        path:"/dashboard/manage-users",
        element:<ManageUsers></ManageUsers>
      },
      {
        path:"/dashboard/manage-staff",
        element:<ManageSraff></ManageSraff>
      },
      {
        path:"/dashboard/payments",
        element:<Payment></Payment>
      },
      {
        path:"/dashboard/admin-profile",
        element:<AdminProfile></AdminProfile>
      },
      

    ],
  },
]);
