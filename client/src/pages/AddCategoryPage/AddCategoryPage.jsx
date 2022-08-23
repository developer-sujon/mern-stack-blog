//External Import
import React, { lazy, Suspense } from "react";

//Enternal Import
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import AppNavigation from "../../components/Navigation/AppNavigation";
const AddCategory = lazy(() =>
  import("../../components/AddCategory/AddCategory"),
);

const AddCategoryPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <AppNavigation title="Create New Category Page" />
      <AddCategory />
    </Suspense>
  );
};

export default AddCategoryPage;
