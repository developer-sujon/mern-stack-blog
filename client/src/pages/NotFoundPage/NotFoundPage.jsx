import React, { Suspense } from "react";
import { lazy } from "react";
import AppNavigation from "../../partials/AppNavigation";
import LazyLoader from "../../components/MasterLayout/LazyLoader";

const NotFound = lazy(() => import("../../components/NotFound/NotFound"));

const NotFoundPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <AppNavigation title="Not Found Page" />
      <NotFound />
    </Suspense>
  );
};

export default NotFoundPage;
