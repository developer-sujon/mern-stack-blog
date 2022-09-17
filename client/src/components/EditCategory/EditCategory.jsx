//External import
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsBookmarkCheck } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";

//Internal Imports
import CategoryRequest from "../../APIRequest/CategoryRequest";

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    CategoryRequest.selectCategoryRequest(id);
  }, [id]);

  const { Category } = useSelector((state) => state.Category);

  const CategorySchema = yup.object().shape({
    name: yup.string().required("Category Name is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: Category?.name,
    },
    onSubmit: (values) => {
      CategoryRequest.updateCategoryRequest({ id, postBody: values }).then(
        (result) => {
          result && navigate("/Category-list");
        },
      );
    },
    validationSchema: CategorySchema,
  });

  const removeCategory = (id) => {
    CategoryRequest.deleteCategoryRequest(id).then((result) => {
      result && navigate("/Category-list");
    });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <BsBookmarkCheck className="mx-auto h-12 w-auto" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Update Category
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              <p className="font-medium text-indigo-600 hover:text-indigo-500">
                These are the categories user will select when creating a post
              </p>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>

                <input
                  value={formik.values.name}
                  onChange={formik.handleChange("name")}
                  onBlur={formik.handleBlur("name")}
                  type="text"
                  autoComplete="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center focus:z-10 sm:text-sm"
                  placeholder="Update Category"
                />
                <div className="text-red-400 mb-2">
                  {formik.touched.name && formik.errors.name}
                </div>
              </div>
            </div>

            <div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update Category
                </button>
              </div>
            </div>
          </form>
          <button
            onClick={() => removeCategory(id)}
            className="group relative w-full flex justify-center my-5 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Delete Category
          </button>
        </div>
      </div>
    </>
  );
};

export default EditCategory;
