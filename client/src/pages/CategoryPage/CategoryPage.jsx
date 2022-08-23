import React, { lazy, Suspense } from "react";

//Internal Lib Import
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const CategoryList = lazy(() =>
  import("../../components/CategoryList/CategoryList"),
);
const AppNavigation = lazy(() =>
  import("../../components/Navigation/AppNavigation"),
);

const CategoryPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <AppNavigation title="Create Post Page" />
      <CategoryList />
    </Suspense>
  );
};

export default CategoryPage;
