import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Shared/Login";
import PrivateRoute from "../Contexts/PrivateRoute";
import Register from "../Pages/Shared/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import AddMarathon from "../Pages/DashboardPages/AddMarathon";
import AllMarathons from "../Pages/DashboardPages/AllMarathons";
import MyApplyList from "../Pages/DashboardPages/MyApplyList";
import MarathonDetails from "../Pages/DashboardPages/MarathonDetails";
import RegisterMarathons from "../Pages/DashboardPages/RegisterMarathons";
import MyMarathons from "../Pages/DashboardPages/MyMarathons";
import NotFound from "../Pages/Shared/NotFound";
import AboutUs from "../Pages/AboutUs/AboutUs";
import ContactUs from "../Pages/ContactUs/ContactUs";
import BlogSection from "../Pages/BlogSection/BlogSection";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/blog",
        Component: BlogSection,
      },
      {
        path: "/about-us",
        Component: AboutUs,
      },
      {
        path: "/contact-us",
        Component: ContactUs,
      },
      {
        path: "/marathons",
        element: <AllMarathons></AllMarathons>,
      },
      {
        path: "/marathons/my-marathons/:id",
        element: (
          <PrivateRoute>
            <MarathonDetails></MarathonDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/marathons/register/:id",
        element: (
          <PrivateRoute>
            <RegisterMarathons></RegisterMarathons>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout> </DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <AddMarathon></AddMarathon> },

      {
        path: "/dashboard/my-marathons",
        element: <MyMarathons></MyMarathons>,
      },
      {
        path: "/dashboard/register/:id",
        element: <RegisterMarathons></RegisterMarathons>,
      },

      { path: "/dashboard/my-applies", element: <MyApplyList></MyApplyList> },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

export default router;
