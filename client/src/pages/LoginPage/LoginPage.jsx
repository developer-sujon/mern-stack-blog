//External Lib Import
import React, { Suspense, lazy } from "react";

//Internal Lib Import
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const LoginUser = lazy(() => import("../../components/LoginUser/LoginUser"));
const AppNavigation = lazy(() =>
  import("../../components/Navigation/AppNavigation"),
);
const LoginPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <AppNavigation title="Login Page" />
      <LoginUser />
    </Suspense>
  );
};

export default LoginPage;
