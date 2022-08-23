//External Import
import { AiOutlinePlus } from "react-icons/ai";
import { BsBookmarkCheck } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Navigate } from "react-router-dom";

//Internal Imports
import { createCategoryAction } from "../../redux/slices/categorySlice";

const AddCategory = () => {
  const { loading, appError, serverError, categoryCreated } = useSelector(
    (state) => state.category,
  );

  const dispatch = useDispatch();

  const categorySchema = yup
    .object({
      name: yup.string().required("Category Name is required"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(categorySchema),
    mode: "all",
  });

  const cteateCaregoryHandler = (data, e) => {
    dispatch(createCategoryAction(data));
    e.target.reset();
  };

  if (categoryCreated) return <Navigate to="/category-list" />;

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <BsBookmarkCheck className="mx-auto h-12 w-auto" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Add New Category
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              <p className="font-medium text-indigo-600 hover:text-indigo-500">
                These are the categories user will select when creating a post
              </p>
            </p>
          </div>
          {appError || serverError ? (
            <span className="text-red-400 mb-2 capitalize block text-center">
              {appError || serverError}
            </span>
          ) : null}

          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit(cteateCaregoryHandler)}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Name
                </label>

                <input
                  type="text"
                  autoComplete="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center focus:z-10 sm:text-sm"
                  placeholder="New Category"
                  {...register("name")}
                />
                <div className="text-red-400 mb-2">{errors?.name?.message}</div>
              </div>
            </div>

            <div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <AiOutlinePlus
                      className="h-5 w-5 text-yellow-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Add new Category
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
