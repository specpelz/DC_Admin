import React, { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { message } from "antd";

interface PrivateRoutesProps {
  children: JSX.Element;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ children }) => {
  const authToken =
    localStorage.getItem("DC_Token") || sessionStorage.getItem("DC_Token");

  // Create a ref to track whether the message has been shown
  const messageShownRef = useRef(false);

  useEffect(() => {
    if (!authToken && !messageShownRef.current) {
      message.error("Please log in!");
      messageShownRef.current = true; // Set the flag to prevent duplicate messages
    }
  }, [authToken]);

  if (!authToken) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoutes;
