//External Import
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineHeart,
  AiOutlineEye,
  AiOutlineCloudUpload,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { BsEnvelopeOpen, BsEmojiAngry } from "react-icons/bs";
import { useSelector } from "react-redux";

//Internal Import
import DateFormatter from "../../utils/DateFormatter";

const Profile = () => {
  const { UserDetails } = useSelector((state) => state.User);

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
        <div className="flex-1 relative z-0 flex overflow-hidden">
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
            <article>
              <div>
                <div className="h-32 w-full object-cover lg:h-48"></div>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                    <div className="flex -mt-20">
                      <img
                        className="h-24 w-24 rounded-full  ring-4 ring-white sm:h-32 sm:w-32"
                        src={UserDetails?.avatar}
                        alt={UserDetails?.userName}
                      />
                    </div>
                    <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                      <div className=" flex flex-col 2xl:block mt-10 min-w-0 flex-1">
                        <h1 className="text-2xl font-bold text-gray-900 ">
                          {UserDetails?.name}
                          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                            {UserDetails?.accountStatus}
                          </span>

                          {UserDetails?.accountStatus === "PENDING" ? (
                            <>
                              <span className="inline-flex ml-2 items-center px-3 py-0.5  rounded-lg text-sm font-medium bg-red-600 text-gray-300">
                                Unverified Account
                              </span>
                              <button className="inline-flex ml-2 items-center px-3 py-0.5  rounded-lg text-sm font-medium bg-green-600 text-gray-300">
                                Verify Account
                              </button>
                            </>
                          ) : (
                            <span className="inline-flex ml-2 items-center px-3 py-0.5  rounded-lg text-sm font-medium bg-green-600 text-gray-300">
                              Account Verified
                            </span>
                          )}
                        </h1>
                        <p className="m-3 text-lg">
                          Date Joined:{" "}
                          {<DateFormatter date={UserDetails?.createdAt} />}
                        </p>
                        <p className="text-green-400 mt-2 mb-2">
                          {UserDetails?.postCount} posts{" "}
                          {UserDetails?.followes?.length} followers{" "}
                          {UserDetails?.following?.length} following
                        </p>

                        <Link
                          to="/"
                          // to={`/upload-profile-photo/${profile?._id}`}
                          className="inline-flex justify-center w-48 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                        >
                          <span>Update Profile</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
