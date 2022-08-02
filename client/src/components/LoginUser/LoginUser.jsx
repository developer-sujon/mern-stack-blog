import React from "react";
import { useForm } from "react-hook-form";
import ApiRequest from "../../APIRequest/ApiRequest";
import ToastMessage from "../../helper/ToastMessage";

const LoginUser = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({ mode: "all" });

  const formSubmit = (data) => {
    ApiRequest.loginUserRequest(data.email, data.password).then((result) => {
      if (result === true) {
        ToastMessage.successMessage("Login Successfull");
        reset();
      }
    });
  };

  return (
    <div className="container" style={{ marginTop: "150px" }}>
      <div className="row justify-content-center align-items-center">
        <div className="col-6">
          <div className="account">
            <h2>Log In</h2>
            <form onSubmit={handleSubmit(formSubmit)}>
              <div className="input__group mb-15">
                <label className="input__group__label" htmlFor="phone">
                  Your Email
                </label>
                <input
                  placeholder="Your Email"
                  className="input__group__control animated fadeInUp"
                  type="email"
                  id="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email Is Required",
                    },
                    pattern: {
                      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                      message: "Invalid Email Address",
                    },
                  })}
                />
                <span className="text-danger">
                  {errors.email && errors.email.message}
                </span>
              </div>

              <div className="input__group mb-15">
                <label className="input__group__label" htmlFor="password">
                  Your Password
                </label>
                <input
                  placeholder="Your Password"
                  className="input__group__control animated fadeInUp"
                  type="text"
                  id="password"
                  {...register("password", {
                    required: "Password Is Required",
                  })}
                />
                <span className="text-danger my-5">
                  {errors.password && errors.password.message}
                </span>
              </div>

              <div className="input__group mb-15">
                <input
                  className="animated fadeInUp btn btn-default"
                  type="submit"
                  value="Log In"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
