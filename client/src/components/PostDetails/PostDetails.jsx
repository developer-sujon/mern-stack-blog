import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  deletepostAction,
  selectPostBySlug,
} from "../../redux/slices/postSlice";
import DateFormatter from "../../utils/DateFormatter";

const PostDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  //select post details from store
  const post = useSelector((state) => state?.post);
  const {
    postDetails,
    loading,
    appError,
    serverError,
    likes,
    dislikes,
    isDeleted,
  } = post;

  useEffect(() => {
    dispatch(selectPostBySlug(slug));
  }, [dispatch]);

  //Get login user

  const store = useSelector((state) => state.profile);
  const { user } = store;

  const isCreatedBy = postDetails?.user?.[0]?._id === user?._id;

  if (isDeleted) return <Navigate to="/posts" />;

  return (
    <>
      {loading ? (
        <div className="h-screen">'Loding'</div>
      ) : appError || serverError ? (
        <h1 className="h-screen text-red-400 text-xl">
          {serverError} {appError}
        </h1>
      ) : (
        <section className="py-20 2xl:py-40 bg-gray-800 overflow-hidden">
          <div className="container px-4 mx-auto">
            <img
              className="mb-24 w-full h-96 object-cover"
              src={postDetails?.postThumbnail}
              alt={postDetails?.slug}
            />
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="mt-7 mb-14 text-6xl 2xl:text-7xl text-white font-bold font-heading">
                {postDetails?.title}
              </h2>

              <div className="inline-flex pt-14 mb-14 items-center border-t border-gray-500">
                <img
                  className="mr-8 w-20 lg:w-24 h-20 lg:h-24 rounded-full"
                  src={postDetails?.user?.[0]?.avatar}
                  alt=""
                />
                <div className="text-left">
                  <h4 className="mb-1 text-2xl font-bold text-gray-50">
                    <span className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 to-orange-600">
                      {postDetails?.user?.[0]?.userName}
                    </span>
                  </h4>
                  <p className="text-gray-500">
                    {<DateFormatter date={post?.createdAt} />}
                  </p>
                </div>
              </div>
              {/* Post description */}
              <div class="max-w-xl mx-auto">
                <p class="mb-6 text-left  text-xl text-gray-200">
                  {postDetails?.description}
                  {isCreatedBy ? (
                    <p class="flex">
                      <Link to={`/update-post/${postDetails?._id}`} class="p-3">
                        <BsPencil class="h-8 mt-3 text-yellow-300" />
                      </Link>
                      <button
                        onClick={() =>
                          dispatch(deletepostAction(postDetails?._id))
                        }
                        class="ml-3"
                      >
                        <BsTrash class="h-8 mt-3 text-red-600" />
                      </button>
                    </p>
                  ) : null}
                </p>
              </div>
            </div>
          </div>
          {/* Add comment Form component here */}
        </section>
      )}
    </>
  );
};

export default PostDetails;
