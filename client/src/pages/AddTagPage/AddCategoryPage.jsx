//External import
import React, { lazy, Suspense } from "react";

//Enternal Import
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import AppNavigation from "../../components/Navigation/AppNavigation";
const AddTag = lazy(() => import("../../components/AddTag/AddTag"));

const AddTagPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <AppNavigation title="Create New Tag Page" />
      <AddTag />
    </Suspense>
  );
};

export default AddTagPage;
