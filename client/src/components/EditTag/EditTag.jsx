//External import
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BsBookmarkCheck } from "react-icons/bs";
import { useFormik } from "formik";
import * as yup from "yup";
import TagRequest from "../../APIRequest/TagRequest";

//Internal Imports

const EditTag = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    TagRequest.selectTagRequest(id);
  }, [id]);

  const { Tag } = useSelector((state) => state.Tag);

  const TagSchema = yup
    .object({
      name: yup.string().required("Tag Name is required"),
    })
    .required();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: Tag?.name,
    },
    validationSchema: TagSchema,
    onSubmit: (values) => {
      TagRequest.updateTagRequest({ id, postBody: values }).then((result) => {
        result && navigate("/Tag-list");
      });
    },
  });

  const removeTag = (id) => {
    TagRequest.deleteTagRequest(id).then((result) => {
      result && navigate("/Tag-list");
    });
  };

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
            onClick={() => removeTag(id)}
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
