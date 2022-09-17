//External Libimports
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

//Enternel lib imports
import AddCategoryPage from "./pages/AddCategoryPage/AddCategoryPage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import EditCategoryPage from "./pages/EditCategoryPage/EditCategoryPage";
import AddTagPage from "./pages/AddTagPage/AddCategoryPage";
import TagPage from "./pages/TagPage/CategoryPage";
import EditTagPage from "./pages/EditTagPage/EditTagPage";
import CreatePostPage from "./pages/CreatePostPage/CreatePostPage";
import PostPage from "./pages/PostPage/PostPage";
import EditPostPage from "./pages/EditPostPage/EditPostPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import FullScreenLoader from "./components/Common/FullScreenLoader";
import PostDetailsPage from "./pages/PostDetailsPage/PostDetailsPage";
import UsersListPage from "./pages/UsersListPage/UsersListPage";
import SendEmailPage from "./pages/SendEmailPage/SendEmailPage";
import OtherProfilePage from "./pages/OtherProfilePage/OtherProfilePage";

const App = () => {
  const { accessToken } = useSelector((state) => state.Auth);

  const { UserDetails } = useSelector((state) => state.User);
  const roles = UserDetails?.roles?.[0];

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={accessToken ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path="/registration"
            element={accessToken ? <Navigate to="/" /> : <RegistrationPage />}
          />
          <Route
            path="/create-post"
            element={
              accessToken ? <CreatePostPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/posts"
            element={accessToken ? <PostPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/posts/:slug"
            element={
              accessToken ? <PostDetailsPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/profile"
            element={accessToken ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile/:userName"
            element={
              accessToken ? <OtherProfilePage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/posts/:slug"
            element={
              accessToken ? <PostDetailsPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/edit-post/:id"
            element={accessToken ? <EditPostPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={accessToken ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/add-category"
            element={
              accessToken && roles === "ADMIN" ? (
                <AddCategoryPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/category-list"
            element={
              accessToken && roles === "ADMIN" ? (
                <CategoryPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/edit-category/:id"
            element={
              accessToken && roles === "ADMIN" ? (
                <EditCategoryPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/add-tag"
            element={
              accessToken && roles === "ADMIN" ? (
                <AddTagPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/tag-list"
            element={
              accessToken && roles === "ADMIN" ? (
                <TagPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/edit-tag/:id"
            element={
              accessToken && roles === "ADMIN" ? (
                <EditTagPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/users"
            element={
              accessToken && roles === "ADMIN" ? (
                <UsersListPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/send-email/:email"
            element={
              accessToken ? (
                <SendEmailPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <FullScreenLoader />
    </>
  );
};

export default App;
