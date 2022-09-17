import React, { lazy, Suspense } from "react";

//Internal Lib Import
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const OtherProfile = lazy(() =>
  import("../../components/OtherProfile/OtherProfile"),
);
const AppNavigation = lazy(() =>
  import("../../components/Navigation/AppNavigation"),
);

const OtherProfilePage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <AppNavigation title="Other Profile Page" />
      <OtherProfile />
    </Suspense>
  );
};

export default OtherProfilePage;
