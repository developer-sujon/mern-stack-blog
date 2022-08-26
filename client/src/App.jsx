//external lib imports
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

// import FullScreenLoader from "./components/MasterLayout/FullScreenLoader";
import AddCategoryPage from "./pages/AddCategoryPage/AddCategoryPage";
import AddTagPage from "./pages/AddTagPage/AddCategoryPage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import CreatePostPage from "./pages/CreatePostPage/CreatePostPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import TagPage from "./pages/TagPage/CategoryPage";
import EditCategoryPage from "./pages/EditCategoryPage/EditCategoryPage";
import EditTagPage from "./pages/EditTagPage/EditTagPage";
import PostPage from "./pages/PostPage/PostPage";
import PostDetailsPage from "./pages/PostDetailsPage/PostDetailsPage";
import AdminRoutes from "./private/AdminRoutes";
import PrivateRoutes from "./private/PrivateRoutes";

//enternel lib imports
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

            <Route element={<AdminRoutes />}>
              <Route path="add-category" element={<AddCategoryPage />} />
              <Route path="category-list" element={<CategoryPage />} />
              <Route path="edit-category/:id" element={<EditCategoryPage />} />
              <Route path="add-tag" element={<AddTagPage />} />
              <Route path="tag-list" element={<TagPage />} />
              <Route path="edit-tag/:id" element={<EditTagPage />} />
              <Route path="create-post" element={<CreatePostPage />} />
              <Route path="posts" element={<PostPage />} />
              <Route path="posts/:slug" element={<PostDetailsPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <FullScreenLoader /> */}
    </>
  );
};

export default App;
