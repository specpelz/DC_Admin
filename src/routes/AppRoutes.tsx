import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Spinner from "@components/spinner";

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
            <React.Suspense fallback={<Spinner />}>
              <Login />
            </React.Suspense>
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoutes>
              <React.Suspense fallback={<Spinner />}>
                <AirMonitoring />
              </React.Suspense>
            </PrivateRoutes>
          }
        >
          <Route
            path="multimedia"
            element={
              <React.Suspense fallback={<Spinner />}>
                <Multimedia />
              </React.Suspense>
            }
          />
          <Route
            path="blog"
            element={
              <React.Suspense fallback={<Spinner />}>
                <Blog />
              </React.Suspense>
            }
          />
          <Route
            path="content"
            element={
              <React.Suspense fallback={<Spinner />}>
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
