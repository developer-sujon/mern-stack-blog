////External Libimports
import React, { Suspense, lazy } from "react";

//Internal Lib Import
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const RegistrationUser = lazy(() =>
  import("../../components/RegistrationUser/RegistrationUser"),
);
const AppNavigation = lazy(() =>
  import("../../components/Navigation/AppNavigation"),
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
