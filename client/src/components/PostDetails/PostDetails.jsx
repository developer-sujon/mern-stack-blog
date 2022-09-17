//External Import
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useSelector } from "react-redux";

//Internal Import
import DateFormatter from "../../utils/DateFormatter";
import PostRequest from "../../APIRequest/PostRequest";

const PostDetails = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { Post } = useSelector((state) => state?.Post);

  useEffect(() => {
    PostRequest.selectPostBySlug(slug);
  }, [slug]);

  //Get login user
  const { UserDetails } = useSelector((state) => state.User);

  const isCreatedBy = Post?.user?.[0]?._id === UserDetails?._id;
  const deletepost = (id) => {
    PostRequest.deletePostRequest(id).then((result) => {
      result && navigate("/posts");
    });
  };

  return (
    <>
      {
        <section className="py-20 2xl:py-40 bg-gray-800 overflow-hidden">
          <div className="container px-4 mx-auto">
            <img
              className="mb-24 w-full h-96 object-cover"
              src={Post?.postThumbnail}
              alt={Post?.slug}
            />
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="mt-7 mb-14 text-6xl 2xl:text-7xl text-white font-bold font-heading">
                {Post?.title}
              </h2>

              <div className="inline-flex pt-14 mb-14 items-center border-t border-gray-500">
                <img
                  className="mr-8 w-20 lg:w-24 h-20 lg:h-24 rounded-full"
                  src={Post?.user?.[0]?.avatar}
                  alt=""
                />
                <div className="text-left">
                  <h4 className="mb-1 text-2xl font-bold text-gray-50">
                    <span className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 to-orange-600">
                      {Post?.user?.[0]?.userName}
                    </span>
                  </h4>
                  <p className="text-gray-500">
                    {<DateFormatter date={Post?.createdAt} />}
                  </p>
                </div>
              </div>
              <div class="max-w-xl mx-auto">
                <p class="mb-6 text-left  text-xl text-gray-200">
                  {Post?.description}
                  {isCreatedBy ? (
                    <p class="flex">
                      <Link to={`/edit-post/${Post?._id}`} class="p-3">
                        <BsPencil class="h-8 mt-3 text-yellow-300" />
                      </Link>
                      <button
                        onClick={() => deletepost(Post?._id)}
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
      }
    </>
  );
};

export default PostDetails;
