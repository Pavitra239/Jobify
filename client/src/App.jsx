import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  DashboardLayout,
  Login,
  Register,
  Error,
  AddJob,
  Stats,
  Profile,
  AllJobs,
  Admin,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <AddJob /> },
          { path: "all-jobs", element: <AllJobs /> },
          { path: "profile", element: <Profile /> },
          { path: "admin", element: <Admin /> },
          { path: "stats", element: <Stats /> },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
