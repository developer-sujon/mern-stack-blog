import React, { lazy, Suspense } from "react";

//Internal Lib Import
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const PostDetails = lazy(() =>
  import("../../components/PostDetails/PostDetails"),
);
const AppNavigation = lazy(() =>
  import("../../components/Navigation/AppNavigation"),
);

const PostDetailsPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <AppNavigation title="Edit Category Page" />
      <PostDetails />
    </Suspense>
  );
};

export default PostDetailsPage;
