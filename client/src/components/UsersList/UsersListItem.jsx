import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { useDispatch } from "react-redux";

const UsersListItem = ({ user }) => {
  //dispatch
  const dispatch = useDispatch();

  const sendMailNavigator = () => {};
  return (
    <>
      <div className="p-8 mb-4 bg-white shadow rounded">
        <div className="flex flex-wrap items-center -mx-4">
          <div className="w-full lg:w-3/12 flex px-4 mb-6 lg:mb-0">
            <img
              className="w-10 h-10 mr-4 object-cover rounded-full"
              src={user?.avatar}
              alt="profile "
            />
            <div>
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
          <div className="w-1/2 lg:w-2/12 px-4 mb-6 lg:mb-0">
            <p className="py-1 px-2 text-xs text-purple-500 bg-purple-50 rounded-full">
              {user?.accountStatus}
            </p>
          </div>
          <div className="w-1/2 lg:w-2/12 px-4 mb-6 lg:mb-0">
            <p className="text-sm font-medium">
              <span className="text-base mr-2  text-bold text-yellow-500">
                {user?.followes?.length}
              </span>
              followers
            </p>
          </div>
          <div className="w-full flex lg:w-4/12 px-4  mb-6 lg:mb-0">
            <p className="inline-block py-1 px-2 mr-2 mb-1 lg:mb-0 text-xs border-2 rounded">
              <span className="text-base mr-2  boder-2 text-bold text-yellow-500">
                {user?.postCount} - Posts
              </span>
            </p>
            <Link
              to={`/profile/${user?._id}`}
              className=" text-gray-600 inline-block py-1 px-2 text-center mr-2 mb-1 lg:mb-0 text-xs border-2 border-yellow-500 rounded hover:bg-green-600 hover:text-white"
            >
              Profile
            </Link>

            {user?.accountStatus === "REJECTED" ? (
              <button
                onClick={() => dispatch("unBlockUserAction"(user?._id))}
                className="inline-block py-1 px-2 text-center bg-gray-500 text-gray-300 mr-2 mb-1 lg:mb-0 text-xs border rounded"
              >
                unblock
              </button>
            ) : (
              <button
                onClick={() => dispatch("blockUserAction"(user?._id))}
                className="inline-block py-1 px-2 text-center bg-red-600 text-gray-300 mr-2 mb-1 lg:mb-0 text-xs border rounded"
              >
                Block
              </button>
            )}

            <button
              onClick={sendMailNavigator}
              className="inline-flex  justify-center bg-green-700 px-2   border border-yellow-700 shadow-sm text-sm font-medium rounded-md text-gray-700  hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              <AiOutlineMail
                className="-ml-1 mr-2 h-5 w-5 text-gray-200"
                aria-hidden="true"
              />
              <span className="text-base mr-2  text-bold text-yellow-500">
                Message
              </span>
            </button>
          </div>
          <div className="w-full lg:w-1/12 px-4">
            <div className="flex items-center">
              {/* Send Mail */}
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersListItem;
