//External Libimports
import React, { Suspense, lazy } from "react";

//Internal Lib Import
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const PostList = lazy(() => import("../../components/PostList/PostList"));
const AppNavigation = lazy(() =>
  import("../../components/Navigation/AppNavigation"),
);

const PostPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <AppNavigation title="Post Page" />
      <PostList />
    </Suspense>
  );
};

export default PostPage;
