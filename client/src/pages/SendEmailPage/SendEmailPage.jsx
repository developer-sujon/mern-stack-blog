//External Libimports
import React, { Suspense, lazy } from "react";

//Internal Lib Import
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const SendEmail = lazy(() => import("../../components/SendEmail/SendEmail"));
const AppNavigation = lazy(() =>
  import("../../components/Navigation/AppNavigation"),
);

const SendEmailPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <AppNavigation title="Users List Page" />
      <SendEmail />
    </Suspense>
  );
};

export default SendEmailPage;
