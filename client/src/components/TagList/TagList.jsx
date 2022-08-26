import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsPencil } from "react-icons/bs";

import { selectAllTagAction } from "../../redux/slices/tagSlice";

const TagList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(selectAllTagAction());
  }, []);

  const store = useSelector((state) => state?.tag);
  const { tagList, loading, appErr, serverErr } = store;

  return (
    <div className="w-full max-w-screen-xl mx-auto mt-5">
      {loading ? (
        <h2 className="text-center text-3xl text-green-800">Loading</h2>
      ) : appErr || serverErr ? (
        <h2 className="text-center text-3xl text-red-600">
          {appErr} {serverErr}
        </h2>
      ) : tagList?.length <= 0 ? (
        <h2 className="text-center text-3xl text-green-800">
          No category Found
        </h2>
      ) : (
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Author
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Created At
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tagList?.map((tag) => (
                      <tr className="bg-gray-50" key={tag._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={tag?.user[0]?.avatar}
                                alt="tag profile"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {tag?.user[0]?.userName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {tag?.user[0]?.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                          {tag.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(tag?.createdAt).toDateString()}
                        </td>
                        <Link to={`/edit-tag/${tag._id}`}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <BsPencil className="h-5 text-indigo-500" />
                          </td>
                        </Link>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TagList;
