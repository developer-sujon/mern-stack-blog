//External Import
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";

//Internal Import
import PostRequest from "../../APIRequest/PostRequest";
import TagDropDown from "../TagDropDown/TagDropDown";
import CategoryRequest from "../../APIRequest/CategoryRequest";

const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    PostRequest.selectPostRequest(id);
  }, [id]);

  useEffect(() => {
    CategoryRequest.selectAllCategoryRequest();
  }, [id]);

  const { CategoryList } = useSelector((state) => state?.Category);
  const { Post } = useSelector((state) => state?.Post);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: Post?.title,
      categoryId: Post?.categoryId,
      description: Post?.description,
      tagsId: Post?.tagsId?.toString(),
      postThumbnail: "",
    },
    onSubmit: (values) => {
      let formData = new FormData();
      formData.append("title", values?.title);
      formData.append("categoryId", values?.categoryId);
      formData.append("description", values?.description);

      if (values.postThumbnail !== undefined) {
        formData.append("postThumbnail", values?.postThumbnail);
      }
      formData.append("tagsId", values?.tagsId);

      PostRequest.updatePostRequest(id, formData).then((result) => {
        navigate("/posts");
      });
    },
  });

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
          Update Post
        </h2>

        <p className="mt-2 text-center text-sm text-gray-600">
          <p className="font-medium text-green-600 hover:text-indigo-500">
            Share your ideas to the word. Your post must be free from profanity
          </p>
        </p>
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
                  autoFocus
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
              name="CategoryId"
              value={formik.values.CategoryId}
              onChange={formik.handleChange("CategoryId")}
              onBlur={formik.handleBlur("CategoryId")}
              autoFocus
            >
              {CategoryList &&
                CategoryList.map((Category) => {
                  return <option value={Category._id}>{Category.name}</option>;
                })}
            </select>
            <div className="text-red-500">
              {formik.touched.Category && formik.errors.Category}
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
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
