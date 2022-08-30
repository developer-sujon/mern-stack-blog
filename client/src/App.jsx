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
import AdminRoutes from "./private/AdminRoutes";
import PrivateRoutes from "./private/PrivateRoutes";

const App = () => {
  const auth = useSelector((state) => state.auth);
  const accessToken = auth?.accessToken;

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
          <Route path="/" element={<HomePage />} />

          <Route element={<PrivateRoutes />}>
            <Route path="create-post" element={<CreatePostPage />} />
            <Route path="posts" element={<PostPage />} />
            <Route path="posts/:slug" element={<PostDetailsPage />} />
            <Route path="edit-post/:id" element={<EditPostPage />} />
            <Route path="profile" element={<ProfilePage />} />

            <Route element={<AdminRoutes />}>
              <Route path="add-category" element={<AddCategoryPage />} />
              <Route path="category-list" element={<CategoryPage />} />
              <Route path="edit-category/:id" element={<EditCategoryPage />} />
              <Route path="add-tag" element={<AddTagPage />} />
              <Route path="tag-list" element={<TagPage />} />
              <Route path="edit-tag/:slug" element={<EditTagPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <FullScreenLoader />
    </>
  );
};

export default App;
