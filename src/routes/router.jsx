import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import UserRoute from "./UserRoute";
import StaffRoute from "./StaffRoute";
import AdminRoute from "./AdminRoute";

import MyIssues from "../pages/Dashboard/Citizen/MyIssues";
import ReportIssues from "../pages/Dashboard/Citizen/ReportIssues";
import Profile from "../pages/Common/Profile";
import AssignedIssues from "../pages/Dashboard/Staff/AssignedIssues";
import StaffProfile from "../pages/Common/StaffProfile";
import AdminOverview from "../pages/Dashboard/Admin/AdminOverview";
import AdminAllIssues from "../pages/Dashboard/Admin/AdminAllIssues";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageStaff from "../pages/Dashboard/Admin/ManageStaff";
import Payment from "../pages/Dashboard/Admin/Payment";
import AdminProfile from "../pages/Common/AdminProfile";

import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentSuccessBoosting from "../pages/Dashboard/Payment/PaymentSuccessBoosting";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";
import LoadingSpinner from "../Component/LoadingSpinner/LoadingSpinner";
import Errorpage from "../pages/Errorpage/Errorpage";
import AllIssues from "../pages/AllIssues/AllIssues";
import IssueDetails from "../pages/AllIssues/IssueDetails";
import StaffOverview from "../pages/Dashboard/Staff/StaffOverview";
import CitizenOverview from "../pages/Dashboard/Citizen/CitizenOverview";
import HowItWork from "../pages/Home/HowItWork/HowItWork";
import AboutSection from "../pages/Home/About/AboutSection";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Errorpage />,
    children: [
      { path: "/", element: <Home /> },
      {
        path:'issues',
        element:<AllIssues></AllIssues>,
        loader: () => fetch("/catagory.json").then((res) => res.json()),
        hydrateFallbackElement: <LoadingSpinner />,
      },
      {
        path:'issue-details/:id',
        element:<PrivateRoute><IssueDetails></IssueDetails></PrivateRoute>,
        
      },
      {
        path:'how-it-works',
        element:<HowItWork></HowItWork>
      },
      {
        path:'about',
        element:<AboutSection></AboutSection>
      }
     
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },

  // Dashboard routes
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // Citizen routes

      {
        path:"citizen-overview",
        element:<UserRoute><CitizenOverview></CitizenOverview></UserRoute>

      },
      {
        path: "my-issues",
        element: (
          <UserRoute>
            <MyIssues />
          </UserRoute>
        ),
        loader: () => fetch("/catagory.json").then((res) => res.json()),
        hydrateFallbackElement: <LoadingSpinner />,
      },
      {
        path: "report-issues",
        element: (
          <UserRoute>
            <ReportIssues />
          </UserRoute>
        ),
        loader: () => fetch("/catagory.json").then((res) => res.json()),
        hydrateFallbackElement: <LoadingSpinner />,
      },
      {
        path: "profile",
        element: (
          <UserRoute>
            <Profile />
          </UserRoute>
        ),
      },
      // Payment routes (accessible by all logged-in users)
      { path: "payment-success", element: <PaymentSuccess /> },
      { path: "payment-success-boosting", element: <PaymentSuccessBoosting /> },
      { path: "payment-cancelled", element: <PaymentCancelled /> },

      // Staff routes
      {
        path: "staff-overview",
        element: (
          <StaffRoute>
            <StaffOverview />
          </StaffRoute>
        ),
      },
      {
        path: "assigned-issue",
        element: (
          <StaffRoute>
            <AssignedIssues />
          </StaffRoute>
        ),
      },
      {
        path: "staff-profile",
        element: (
          <StaffRoute>
            <StaffProfile />
          </StaffRoute>
        ),
      },

      // Admin routes
      {
        path: "admin-overview",
        element: (
          <AdminRoute>
            <AdminOverview />
          </AdminRoute>
        ),
      },
      {
        path: "all-issues",
        element: (
          <AdminRoute>
            <AdminAllIssues />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-staff",
        element: (
          <AdminRoute>
            <ManageStaff />
          </AdminRoute>
        ),
      },
      {
        path: "payments",
        element: (
          <AdminRoute>
            <Payment />
          </AdminRoute>
        ),
      },
      {
        path: "admin-profile",
        element: (
          <AdminRoute>
            <AdminProfile />
          </AdminRoute>
        ),
      },
    ],
  },
]);
