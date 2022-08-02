import React, { Suspense } from "react";

//Internal Lib Import
import AppNavigation from "../../partials/AppNavigation";
import LazyLoader from "../../components/MasterLayout/LazyLoader";

const HomePage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <AppNavigation title="Home Page" />
    </Suspense>
  );
};

export default HomePage;
