import React, { lazy, Suspense } from "react";

//Internal Lib Import
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const EditCategory = lazy(() =>
  import("../../components/EditCategory/EditCategory"),
);
const AppNavigation = lazy(() =>
  import("../../components/Navigation/AppNavigation"),
);

const EditCategoryPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <AppNavigation title="Edit Category Page" />
      <EditCategory />
    </Suspense>
  );
};

export default EditCategoryPage;
