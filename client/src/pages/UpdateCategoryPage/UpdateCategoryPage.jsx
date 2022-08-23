import React, { lazy, Suspense } from "react";

//Internal Lib Import
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const UpdateCategory = lazy(() =>
  import("../../components/UpdateCategory/UpdateCategory"),
);
const AppNavigation = lazy(() =>
  import("../../components/Navigation/AppNavigation"),
);

const UpdateCategoryPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <AppNavigation title="Create Post Page" />
      <UpdateCategory />
    </Suspense>
  );
};

export default UpdateCategoryPage;
