import React, { lazy, Suspense } from "react";

//Internal Lib Import
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const Profile = lazy(() => import("../../components/Profile/Profile"));
const AppNavigation = lazy(() =>
  import("../../components/Navigation/AppNavigation"),
);

const ProfilePage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <AppNavigation title="Profile Page" />
      <Profile />
    </Suspense>
  );
};

export default ProfilePage;
