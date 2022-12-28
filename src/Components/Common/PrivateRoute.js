import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const theme = sessionStorage.getItem("godhadmin");
  return theme ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
