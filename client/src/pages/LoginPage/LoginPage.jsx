import React, { Suspense, lazy } from "react";

//Internal Lib Import
import AppNavigation from "../../partials/AppNavigation";
import LazyLoader from "../../components/MasterLayout/LazyLoader";

const LoginUser = lazy(() => import("../../components/LoginUser/LoginUser"));

const LoginPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <AppNavigation title="Login Page" />
      <LoginUser />
    </Suspense>
  );
};

export default LoginPage;
