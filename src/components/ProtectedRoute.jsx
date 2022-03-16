import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.userReducer);

  return user.user ? children : <Navigate replace to="/" />;
};

export default ProtectedRoute;
