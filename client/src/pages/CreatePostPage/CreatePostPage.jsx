import React, { lazy, Suspense } from "react";

//Internal Lib Import
import AppNavigation from "../../partials/AppNavigation";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const CreatePost = lazy(() => import("../../components/CreatePost/CreatePost"));

const CreatePostPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <AppNavigation title="Create Post Page" />
      <CreatePost />
    </Suspense>
  );
};

export default CreatePostPage;
