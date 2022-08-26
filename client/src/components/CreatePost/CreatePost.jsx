import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";

//Internal Import
import { selectAllCategoryAction } from "../../redux/slices/categorySlice";
import TagDropDown from "../TagDropDown/TagDropDown";
import { createPostAction } from "../../redux/slices/postSlice";

const CreatePost = () => {
  const [currentImage, setCurrentImage] = useState("Choose Image");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(selectAllCategoryAction());
  }, [dispatch]);

  const store = useSelector((state) => state?.category);
  const { categoryList, loading, appErr, serverErr } = store;

  const postSchema = yup.object().shape({
    title: yup.string().required("Post Title is required"),
    categoryId: yup.string().required("Post Category Name is required"),
    description: yup.string().required("Post Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      categoryId: "630759a6ae28a05b2e7454b3",
      description: "",
      postThumbnail: "",
      tagsId: "",
    },
    onSubmit: (values) => {
      const postBody = {
        title: values?.title,
        categoryId: values?.categoryId,
        description: values?.description,
        postThumbnail: values?.postThumbnail,
        tagsId: values?.tagsId,
      };

      console.log(postBody);

      let formData = new FormData();
      formData.append("title", values?.title);
      debugger;
      formData.append("categoryId", values?.categoryId);
      debugger;
      formData.append("description", values?.description);
      debugger;
      formData.append("postThumbnail", values?.postThumbnail);
      debugger;
      formData.append("tagsId", values?.tagsId);

      debugger;

      return false;

      dispatch(createPostAction(postBody));
    },
    validationSchema: postSchema,
  });

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
          Create Post
        </h2>

        <p className="mt-2 text-center text-sm text-gray-600">
          <p className="font-medium text-green-600 hover:text-indigo-500">
            Share your ideas to the word. Your post must be free from profanity
          </p>
        </p>

        {appErr || serverErr ? (
          <p className="mt-2 text-center text-lg text-red-600">
            {serverErr} {appErr}
          </p>
        ) : null}
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <div className="mt-1">
                <input
                  id="title"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formik.values.title}
                  onChange={formik.handleChange("title")}
                  onBlur={formik.handleBlur("title")}
                />
              </div>
              <div className="text-red-500">
                {formik.touched.title && formik.errors.title}
              </div>
            </div>
            <label
              htmlFor="caregory"
              className="block text-sm font-medium text-gray-700"
            >
              Select Category
            </label>

            <select
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="categoryId"
              value={formik.values.categoryId}
              onChange={formik.handleChange("categoryId")}
              onBlur={formik.handleBlur("categoryId")}
              autoFocus
            >
              {categoryList &&
                categoryList.map((category) => {
                  return <option value={category._id}>{category.name}</option>;
                })}
            </select>
            <div className="text-red-500">
              {formik.touched.category && formik.errors.category}
            </div>

            <TagDropDown
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
            />

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                rows="5"
                cols="10"
                className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                value={formik.values.description}
                onChange={formik.handleChange("description")}
                onBlur={formik.handleBlur("description")}
              ></textarea>

              <div className="text-red-500">
                {formik.touched.description && formik.errors.description}
              </div>
              <label
                htmlFor="postThumbnail"
                className="block text-sm font-medium mt-3 mb-2 text-gray-700"
              >
                Select image to upload
              </label>

              <input
                type="file"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                name="postThumbnail"
                accept="image/*"
                onChange={(event) => {
                  formik.setFieldValue(
                    "postThumbnail",
                    event.currentTarget.files[0],
                  );
                }}
              />

              <div className="text-red-500">
                {formik.touched.postThumbnail && formik.errors.postThumbnail}
              </div>
            </div>
            <div>
              {loading ? (
                <button
                  disabled
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Loading please wait...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
