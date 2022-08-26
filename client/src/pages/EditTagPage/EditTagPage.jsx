import React, { lazy, Suspense } from "react";

//Internal Lib Import
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const EditTag = lazy(() => import("../../components/EditTag/EditTag"));
const AppNavigation = lazy(() =>
  import("../../components/Navigation/AppNavigation"),
);

const EditTagPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <AppNavigation title="Edit Tag Page" />
      <EditTag />
    </Suspense>
  );
};

export default EditTagPage;
