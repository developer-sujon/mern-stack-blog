//External Import
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

//Internal Import

const PrivateRoutes = () => {
  const auth = useSelector((state) => state.auth);
  const accessToken = auth?.accessToken;

  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
