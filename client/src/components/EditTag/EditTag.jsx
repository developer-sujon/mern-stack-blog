//External Import
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { BsBookmarkCheck } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";

//Internal Imports
import {
  selectTagAction,
  updateTagAction,
  deleteTagAction,
} from "../../redux/slices/tagSlice";

const EditTag = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(selectTagAction(id));
  }, [dispatch]);

  const state = useSelector((state) => state.tag);
  const { loading, appError, serverError, tag, isEdited, isDeleted } = state;

  const tagSchema = yup
    .object({
      name: yup.string().required("Tag Name is required"),
    })
    .required();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: tag?.name,
    },
    onSubmit: (values) => {
      dispatch(updateTagAction({ data: values, id }));
    },
    validationSchema: tagSchema,
  });

  if (isEdited || isDeleted) return <Navigate to="/tag-list" />;

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <BsBookmarkCheck className="mx-auto h-12 w-auto" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Update Tag
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
                  placeholder="Update Tag"
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
                  Update Tag
                </button>
              </div>
            </div>
          </form>
          <button
            onClick={() => dispatch(deleteTagAction(id))}
            className="group relative w-full flex justify-center my-5 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Delete Tag
          </button>
        </div>
      </div>
    </>
  );
};

export default EditTag;
