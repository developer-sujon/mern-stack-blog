import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Internal Lib Import
import AdminNavigation from "./admin/AdminNavigation";
import PrivateNavigation from "./private/PrivateNavigation";
import PublicNavigation from "./public/PublicNavigation";
import ProfileRequest from "../../APIRequest/ProfileRequest";

const AppNavigation = ({ title }) => {
  const auth = useSelector((state) => state.auth);
  const roles = auth?.user?.roles[0];
  const accessToken = auth?.accessToken;

  useEffect(() => {
    accessToken && ProfileRequest.selectProfileRequest();
  }, [accessToken]);

  const store = useSelector((state) => state.profile);
  const { user } = store;

  return (
    <>
      <title>{title}</title>
      {roles === "USER" && accessToken ? (
        <PrivateNavigation user={user} />
      ) : roles === "ADMIN" && accessToken ? (
        <AdminNavigation user={user} />
      ) : (
        <PublicNavigation user={user} />
      )}
    </>
  );
};

export default AppNavigation;
