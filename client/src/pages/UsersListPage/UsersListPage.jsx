//External Libimports
import React, { Suspense, lazy } from "react";

//Internal Lib Import
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const UsersList = lazy(() => import("../../components/UsersList/UsersList"));
const AppNavigation = lazy(() =>
  import("../../components/Navigation/AppNavigation"),
);

const UsersListPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <AppNavigation title="Users List Page" />
      <UsersList />
    </Suspense>
  );
};

export default UsersListPage;
