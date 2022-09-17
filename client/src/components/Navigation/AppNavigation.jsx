import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Internal Lib Import
import AdminNavigation from "./admin/AdminNavigation";
import PrivateNavigation from "./private/PrivateNavigation";
import PublicNavigation from "./public/PublicNavigation";
import UserRequest from "../../APIRequest/UserRequest";

const AppNavigation = ({ title }) => {
  const { accessToken } = useSelector((state) => state.Auth);

  useEffect(() => {
    accessToken && UserRequest.selectUserRequest();
  }, [accessToken]);

  const { UserDetails } = useSelector((state) => state.User);
  const roles = UserDetails?.roles?.[0];

  return (
    <>
      <title>{title}</title>
      {roles === "USER" && accessToken ? (
        <PrivateNavigation user={UserDetails} />
      ) : roles === "ADMIN" && accessToken ? (
        <AdminNavigation user={UserDetails} />
      ) : (
        <PublicNavigation user={UserDetails} />
      )}
    </>
  );
};

export default AppNavigation;
