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
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      {/* Static sidebar for desktop */}

      <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
        <div className="flex-1 relative z-0 flex overflow-hidden">
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
            <article>
              <div>
                <div>
                  <img
                    className="h-32 w-full object-cover lg:h-48"
                    src={user?.avatar}
                    alt={user?.userName}
                  />
                </div>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                    <div className="flex -mt-20">
                      <img
                        className="h-24 w-24 rounded-full  ring-4 ring-white sm:h-32 sm:w-32"
                        src={user?.avatar}
                        alt={user?.userName}
                      />
                    </div>
                    <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                      <div className=" flex flex-col 2xl:block mt-10 min-w-0 flex-1">
                        <h1 className="text-2xl font-bold text-gray-900 ">
                          {user?.name}
                          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                            {user?.accountStatus}
                          </span>

                          {user?.accountStatus === "PENDING" ? (
                            <span className="inline-flex ml-2 items-center px-3 py-0.5  rounded-lg text-sm font-medium bg-red-600 text-gray-300">
                              Unverified Account
                            </span>
                          ) : (
                            <span className="inline-flex ml-2 items-center px-3 py-0.5  rounded-lg text-sm font-medium bg-green-600 text-gray-300">
                              Account Verified
                            </span>
                          )}
                        </h1>
                        <p className="m-3 text-lg">
                          Date Joined:{" "}
                          {<DateFormatter date={user?.createdAt} />}
                        </p>
                        <p className="text-green-400 mt-2 mb-2">
                          {user?.posts?.length} posts {user?.followers?.length}{" "}
                          followers {user?.following?.length} following
                        </p>

                        <div className="flex items-center  mb-2">
                          <AiOutlineEye className="h-5 w-5 " />
                          <div className="pl-2">
                            {user?.viewedBy?.length}{" "}
                            <span className="text-indigo-400 cursor-pointer hover:underline">
                              users viewed your profile
                            </span>
                          </div>
                        </div>

                        {/* is login user */}
                        {/* Upload profile photo */}
                        <Link
                          to="/"
                          // to={`/upload-profile-photo/${profile?._id}`}
                          className="inline-flex justify-center w-48 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                        >
                          <AiOutlineCloudUpload
                            className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <span>Upload Photo</span>
                        </Link>
                      </div>

                      <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                        {/* // Hide follow button from the same */}
                        <div>
                          <button
                            // onClick={() =>
                            //   dispatch(unFollowUserAction(profile?._id))
                            // }
                            className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                          >
                            <BsEmojiAngry
                              className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <span>Unfollow</span>
                          </button>

                          <>
                            <button
                              // onClick={followHandler}
                              type="button"
                              className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                            >
                              <AiOutlineHeart
                                className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span>Follow </span>
                            </button>
                          </>
                        </div>

                        {/* Update Profile */}

                        <>
                          <Link
                            to="/update-profile"
                            className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                          >
                            <AiOutlineUserAdd
                              className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <span>Update Profile</span>
                          </Link>
                        </>
                        {/* Send Mail */}
                        <Link
                          to="/"
                          // to={`/send-mail?email=${profile?.email}`}
                          className="inline-flex justify-center bg-indigo-900 px-4 py-2 border border-yellow-700 shadow-sm text-sm font-medium rounded-md text-gray-700  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                        >
                          <BsEnvelopeOpen
                            className="-ml-1 mr-2 h-5 w-5 text-gray-200"
                            aria-hidden="true"
                          />
                          <span className="text-base mr-2  text-bold text-yellow-500">
                            Send Message
                          </span>
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
