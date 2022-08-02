import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ApiRequest from "../../APIRequest/ApiRequest";
import ToastMessage from "../../helper/ToastMessage";

const RegistrationUser = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    trigger,
    watch,
    reset,
  } = useForm({ mode: "all" });

  const formSubmit = (data) => {
    ApiRequest.registrationUserRequest(data).then((result) => {
      if (result === true) {
        ToastMessage.successMessage("User Register Successfull");
        navigate("/login");
        reset();
      }
    });
  };

  const password = watch("password");

  return (
    <div className="container" style={{ marginTop: "150px" }}>
      <div className="row justify-content-center align-items-center">
        <div className="col-12 col-md-8">
          <div className="account">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit(formSubmit)}>
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="input__group mb-15">
                    <label className="input__group__label" htmlFor="name">
                      Your Name
                    </label>
                    <input
                      placeholder="Your Name"
                      className="input__group__control animated fadeInUp"
                      type="text"
                      id="name"
                      {...register("name", {
                        required: {
                          value: true,
                          message: "Name Is Required",
                        },
                      })}
                    />
                    <span className="text-danger my-5">
                      {errors.name && errors.name.message}
                    </span>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="input__group mb-15">
                    <label className="input__group__label" htmlFor="phone">
                      Your Phone
                    </label>
                    <input
                      placeholder="Your Phone"
                      className="input__group__control animated fadeInUp"
                      type="number"
                      id="phone"
                      {...register("phone", {
                        required: {
                          value: true,
                          message: "Phone Is Required",
                        },
                        pattern: {
                          value:
                            /(^(\+88|0088|88)?(01){1}[3456789]{1}(\d){8})$/,
                          message: "Invalid Phone Number",
                        },
                      })}
                    />
                    <span className="text-danger my-5">
                      {errors.phone && errors.phone.message}
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="input__group mb-15">
                    <label className="input__group__label" htmlFor="userName">
                      Your User Name
                    </label>
                    <input
                      placeholder="Your User Name"
                      className="input__group__control animated fadeInUp"
                      type="text"
                      id="userName"
                      {...register("userName", {
                        required: {
                          value: true,
                          message: "User Name Is Required",
                        },
                      })}
                    />
                    <span className="text-danger my-5">
                      {errors.userName && errors.userName.message}
                    </span>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="input__group mb-15">
                    <label className="input__group__label" htmlFor="email">
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
                          value:
                            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                          message: "Invalid Email Address",
                        },
                      })}
                    />
                    <span className="text-danger my-5">
                      {errors.email && errors.email.message}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="input__group mb-15">
                  <label className="input__group__label" htmlFor="password">
                    Your Password
                  </label>
                  <input
                    placeholder="Your Password"
                    className="input__group__control animated fadeInUp"
                    type="password"
                    id="password"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password Is Required",
                      },
                    })}
                  />
                  <span className="text-danger my-5">
                    {errors.password && errors.password.message}
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="input__group mb-15">
                    <label className="input__group__label" htmlFor="cpassword">
                      Your Confirm Password
                    </label>
                    <input
                      placeholder="Your Confirm Password"
                      className="input__group__control animated fadeInUp"
                      type="password"
                      id="cpassword"
                      {...register("cpassword", {
                        required: {
                          value: true,
                          message: "Confirm password Is Required",
                        },
                        validate: (value) => {
                          return (
                            value === password ||
                            "Password  and Confirm password Not Match"
                          );
                        },
                      })}
                    />
                    <span className="text-danger my-5">
                      {errors.cpassword && errors.cpassword.message}
                    </span>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="input__group mb-15">
                    <input
                      className="animated fadeInUp btn btn-default"
                      type="submit"
                      value="Sign Up"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationUser;
