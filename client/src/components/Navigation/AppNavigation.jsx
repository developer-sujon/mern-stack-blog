import { useSelector } from "react-redux";
//Internal Lib Import
import AdminNavigation from "./admin/AdminNavigation";
import PrivateNavigation from "./private/PrivateNavigation";
import PublicNavigation from "./public/PublicNavigation";

const AppNavigation = ({ title }) => {
  const roles = useSelector((state) => state.auth.roles);

  return (
    <>
      <title>{title}</title>
      {roles === "USER" ? (
        <PrivateNavigation />
      ) : roles === "ADMIN" ? (
        <AdminNavigation />
      ) : (
        <PublicNavigation />
      )}
    </>
  );
};

export default AppNavigation;
