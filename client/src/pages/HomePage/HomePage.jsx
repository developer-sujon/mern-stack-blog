import React, { lazy, Suspense } from "react";

//Internal Lib Import
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const AppNavigation = lazy(() => import("../../partials/AppNavigation"));
const Home = lazy(() => import("../../components/Home/Home"));

const HomePage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <AppNavigation title="Home Page" />
      <Home />
    </Suspense>
  );
};

export default HomePage;
