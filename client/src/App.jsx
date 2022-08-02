//external lib imports
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import FullScreenLoader from "./components/MasterLayout/FullScreenLoader";
import PrivateOutlet from "./components/Private/PrivateOutlet";
import SessionHelper from "./helper/SessionHelper";
import CreatePostPage from "./pages/CreatePostPage/CreatePostPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";

//enternel lib imports
const App = () => {
  const accessToken = SessionHelper.getToken();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={accessToken ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path="/registration"
            element={accessToken ? <Navigate to="/" /> : <RegistrationPage />}
          />
          <Route path="/*" element={<PrivateOutlet />}>
            <Route path="" element={<HomePage />} />
            <Route path="create-post" element={<CreatePostPage />} />
            <Route path="dashboard" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <FullScreenLoader />
    </>
  );
};

export default App;
