import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Internal Lib Import
import { resetAuthAction } from "../../redux/slices/authSlice";
import { selectUserAction } from "../../redux/slices/profileSlice";
import AdminNavigation from "./admin/AdminNavigation";
import PrivateNavigation from "./private/PrivateNavigation";
import PublicNavigation from "./public/PublicNavigation";

const AppNavigation = ({ title }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetAuthAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(selectUserAction());
  }, [dispatch]);

  const auth = useSelector((state) => state.auth);
  const roles = auth?.user?.roles[0];
  const accessToken = auth?.accessToken;

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
