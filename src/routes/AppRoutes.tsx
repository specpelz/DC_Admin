import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Login = lazy(() => import("@pages/Auth/Login"));

// Dashboard
// const Dashboard = lazy(() => import("@pages/Dashboard"));
const AirMonitoring = lazy(() => import("@pages/AirMonitoring"));
const Multimedia = lazy(() => import("@pages/Multimedia"));
const Blog = lazy(() => import("@pages/Blog"));
const WebsiteContent = lazy(() => import("@pages/WebsiteContent"));

const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* Authentication */}
        <Route
          path="/login"
          element={
            <React.Suspense>
              <Login />
            </React.Suspense>
          }
        />

        {/* Dashboard */}
        <Route
          path="/admin"
          element={
            <React.Suspense>
              <AirMonitoring />
            </React.Suspense>
          }
        >
          {/* <Route path="air-monitoring" element={<AirMonitoring />} /> */}
          <Route path="multimedia" element={<Multimedia />} />
          <Route path="blog" element={<Blog />} />
          <Route path="content" element={<WebsiteContent />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
