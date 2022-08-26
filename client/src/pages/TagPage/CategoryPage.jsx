import React, { lazy, Suspense } from "react";

//Internal Lib Import
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const TagList = lazy(() => import("../../components/TagList/TagList"));
const AppNavigation = lazy(() =>
  import("../../components/Navigation/AppNavigation"),
);

const TagPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <AppNavigation title="Tag List Page" />
      <TagList />
    </Suspense>
  );
};

export default TagPage;
