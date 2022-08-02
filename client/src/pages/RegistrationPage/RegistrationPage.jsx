//external lib imports
import React, { Suspense, lazy } from "react";

//Internal Lib Import
import AppNavigation from "../../partials/AppNavigation";
import LazyLoader from "../../components/MasterLayout/LazyLoader";

const RegistrationUser = lazy(() =>
  import("../../components/RegistrationUser/RegistrationUser"),
);

const RegistrationPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <AppNavigation title="Registration Page" />
      <RegistrationUser />
    </Suspense>
  );
};

export default RegistrationPage;
