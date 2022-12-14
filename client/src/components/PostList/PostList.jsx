import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiOutlineThumbUp, HiOutlineThumbDown } from "react-icons/hi";
import { AiOutlineEyeInvisible } from "react-icons/ai";

import DateFormatter from "../../utils/DateFormatter";
import PostRequest from "../../APIRequest/PostRequest";
import CategoryRequest from "../../APIRequest/CategoryRequest";

const PostList = () => {
  useEffect(() => {
    PostRequest.selectAllPostRequest();
  }, []);

  useEffect(() => {
    CategoryRequest.selectAllCategoryRequest();
  }, []);

  const { CategoryList } = useSelector((state) => state?.Category);
  const { PostList } = useSelector((state) => state?.Post);

  const likePost = (id) => {
    PostRequest.likePostRequest(id).then((result) => {
      if (result) {
        PostRequest.selectAllPostRequest();
      }
    });
  };
  const disLikePost = (id) => {
    PostRequest.disLikePostRequest(id).then((result) => {
      if (result) {
        PostRequest.selectAllPostRequest();
      }
    });
  };

  return (
    <section>
      <div className="py-20 bg-gray-900 min-h-screen radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex flex-wrap items-center">
            <div className="w-full lg:w-1/2">
              <span className="text-green-600 font-bold">
                Latest Posts from our awesome authors
              </span>
              <h2 className="text-4xl text-gray-300 lg:text-5xl font-bold font-heading">
                Latest Post
              </h2>
            </div>
            <div className=" block text-right w-1/2">
              <button
                // onClick={() => dispatch(selectAllPostAction(""))}
                className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-green-600 hover:bg-green-700 text-gray-50 font-bold leading-loose transition duration-200"
              >
                View All Posts
              </button>
            </div>
          </div>

          <div className="flex flex-wrap -mx-[1rem]">
            <div className="py-4 px-6 bg-gray-600 shadow rounded w-[25%] p-[1rem]">
              <h4 className="mb-4 text-gray-500 font-bold uppercase">
                Categories
              </h4>
              <ul>
                {CategoryList?.length <= 0 ? (
                  <h1 className="text-yellow-400 text-lg text-center">
                    No Category Found
                  </h1>
                ) : (
                  CategoryList?.map((Category) => (
                    <li>
                      <p
                        // onClick={() =>
                        //   dispatch(fetchPostsAction(Category?.title))
                        // }
                        className="block cursor-pointer py-2 px-3 mb-4 rounded text-yellow-500 font-bold bg-gray-500"
                      >
                        {Category?.name}
                      </p>
                    </li>
                  ))
                )}
              </ul>
            </div>
            <div className="flex flex-wrap w-[75%] p-[1rem]">
              <div className="w-full lg:w-3/4 px-3">
                {PostList?.length <= 0 ? (
                  <h1 className="text-yellow-400 text-lg text-center">
                    No Post Found
                  </h1>
                ) : (
                  PostList?.map((Post) => (
                    <div
                      key={Post._id}
                      className="flex flex-wrap bg-gray-900 -mx-3  lg:mb-6"
                    >
                      <div className="mb-10  w-full lg:w-4/12 ">
                        <a href={Post?.postThumbnail} target="_blank">
                          <img
                            className="w-full h-full object-cover rounded"
                            src={Post?.postThumbnail}
                            alt={Post?.slug}
                          />
                        </a>

                        <div className="flex flex-row bg-gray-300  justify-center w-full  items-center ">
                          <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                            <div className="">
                              <HiOutlineThumbUp
                                onClick={() => likePost(Post?._id)}
                                className="h-7 w-7 text-indigo-600 cursor-pointer"
                              />
                            </div>
                            <div className="pl-2 text-gray-600">
                              {Post?.likes?.length}
                            </div>
                          </div>

                          <div className="flex flex-row  justify-center items-center ml-4 mr-4 pb-2 pt-1">
                            <div>
                              <HiOutlineThumbDown
                                onClick={() => disLikePost(Post?._id)}
                                className="h-7 w-7 cursor-pointer text-gray-600"
                              />
                            </div>
                            <div className="pl-2 text-gray-600">
                              {Post?.disLikes?.length}
                            </div>
                          </div>

                          <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                            <div>
                              <AiOutlineEyeInvisible className="h-7 w-7  text-gray-400" />
                            </div>
                            <div className="pl-2 text-gray-600">
                              {Post?.numView}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full lg:w-7/12 px-3">
                        <Link to={Post?.slug} className="hover:underline">
                          <h3 className="mb-1 text-2xl text-green-400 font-bold font-heading">
                            {Post?.title}
                          </h3>
                        </Link>
                        <p className="text-gray-300">
                          {Post?.description.slice(0, 150)} ....
                        </p>
                        <Link
                          to={`/posts/${Post?.slug}`}
                          className="text-indigo-500 hover:underline"
                        >
                          Read More..
                        </Link>
                        <div className="mt-6 flex items-center">
                          <div className="flex-shrink-0">
                            <Link to="/">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={Post?.user?.[0]?.avatar}
                                alt=""
                              />
                            </Link>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              <Link
                                to={`/profile/${Post?.user?.[0]?.userName}`}
                                className="text-yellow-400 hover:underline "
                              >
                                {Post?.user?.[0]?.userName}
                              </Link>
                            </p>
                            <div className="flex space-x-1 text-sm text-green-500">
                              <time>
                                <DateFormatter date={Post?.createdAt} />
                              </time>
                              <span aria-hidden="true">&middot;</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostList;
