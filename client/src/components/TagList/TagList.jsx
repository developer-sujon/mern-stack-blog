import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsPencil } from "react-icons/bs";
import TagRequest from "../../APIRequest/TagRequest";

const TagList = () => {
  useEffect(() => {
    TagRequest.selectAllTagRequest();
  }, []);

  const { TagList } = useSelector((state) => state?.Tag);

  return (
    <div className="w-full max-w-screen-xl mx-auto mt-5">
      {TagList?.length <= 0 ? (
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
                    {TagList?.map((Tag) => (
                      <tr className="bg-gray-50" key={Tag._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={Tag?.user[0]?.avatar}
                                alt="Tag profile"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {Tag?.user[0]?.userName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {Tag?.user[0]?.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                          {Tag.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(Tag?.createdAt).toDateString()}
                        </td>
                        <Link to={`/edit-tag/${Tag._id}`}>
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
