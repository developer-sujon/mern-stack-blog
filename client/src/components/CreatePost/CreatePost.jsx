import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const CreatePost = () => {
  const [currentImage, setCurrentImage] = useState("Choose Image");
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const formSubmit = (data) => {
    // ApiRequest.loginUserRequest(data.email, data.password).then((result) => {
    //   if (result === true) {
    //     ToastMessage.successMessage("Login Successfull");
    //     reset();
    //   }
    // });
  };

  return (
    <div className="container" style={{ marginTop: "150px" }}>
      <div className="row justify-content-center align-items-center">
        <div className="col-6">
          <div className="account">
            <h2>Create New Post</h2>
            <form onSubmit={handleSubmit(formSubmit)}>
              <div className="input__group mb-15">
                <label className="input__group__label" htmlFor="title">
                  Post Title
                </label>
                <input
                  placeholder="Post Title"
                  className="input__group__control animated fadeInUp"
                  id="title"
                  {...register("title", {
                    required: {
                      value: true,
                      message: "Title Is Required",
                    },
                  })}
                />
                <span className="text-danger">
                  {errors.title && errors.title.message}
                </span>
              </div>

              <div className="input__group mb-15">
                <label className="input__group__label py-3 " htmlFor="image">
                  {currentImage}
                </label>
                <input
                  placeholder="Post Body"
                  className="input__group__control animated fadeInUp"
                  type="file"
                  id="image"
                  {...register("image", {
                    required: "Imgage Is Required",
                  })}
                  hidden
                  onChange={(e) => setCurrentImage(e.target.files[0].name)}
                />
                <span className="text-danger my-5">
                  {errors.image && errors.image.message}
                </span>
              </div>

              <div className="input__group mb-15">
                <label
                  className="input__group__label py-3 "
                  htmlFor="description"
                >
                  Post Description
                </label>
                <textarea
                  rows="4"
                  cols="50"
                  placeholder="Post Body"
                  className="input__group__control animated fadeInUp"
                  id="description"
                  {...register("description", {
                    required: "Description Is Required",
                  })}
                />
                <span className="text-danger my-5">
                  {errors.description && errors.description.message}
                </span>
              </div>

              <div className="input__group mb-15">
                <input
                  className="animated fadeInUp btn btn-default"
                  type="submit"
                  value="Create Post"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="col-6"></div>
      </div>
    </div>
  );
};

export default CreatePost;
