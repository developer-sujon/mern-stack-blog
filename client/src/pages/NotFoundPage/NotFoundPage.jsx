import React, { Suspense } from "react";
import { lazy } from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const NotFound = lazy(() => import("../../components/NotFound/NotFound"));
const AppNavigation = lazy(() =>
  import("../../components/Navigation/AppNavigation"),
);
const NotFoundPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <AppNavigation title="Not Found Page" />
      <NotFound />
    </Suspense>
  );
};

export default NotFoundPage;
