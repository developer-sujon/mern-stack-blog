import React, { lazy, Suspense } from "react";

//Internal Lib Import
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const EditPost = lazy(() => import("../../components/EditPost/EditPost"));
const AppNavigation = lazy(() =>
  import("../../components/Navigation/AppNavigation"),
);

const EditPostPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <AppNavigation title="Edit Post Page" />
      <EditPost />
    </Suspense>
  );
};

export default EditPostPage;
