//External Import
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

//Internal Import

const AdminRoutes = () => {
  const store = useSelector((state) => state.auth);
  const { user } = store;
  const roles = user?.roles[0];

  return roles === "ADMIN" ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoutes;
