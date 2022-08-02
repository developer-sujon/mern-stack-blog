import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import SessionHelper from "../../helper/SessionHelper";

const PrivateOutlet = () => {
  const auth = SessionHelper.getToken();

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateOutlet;
