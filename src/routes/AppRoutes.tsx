import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";

const Login = lazy(() => import("@pages/Auth/Login"));

// Dashboard
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
          path="/"
          element={
            <React.Suspense>
              <Login />
            </React.Suspense>
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoutes>
              <React.Suspense>
                <AirMonitoring />
              </React.Suspense>
            </PrivateRoutes>
          }
        >
          <Route
            path="multimedia"
            element={
              <React.Suspense>
                <Multimedia />
              </React.Suspense>
            }
          />
          <Route
            path="blog"
            element={
              <React.Suspense>
                <Blog />
              </React.Suspense>
            }
          />
          <Route
            path="content"
            element={
              <React.Suspense>
                <WebsiteContent />
              </React.Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
