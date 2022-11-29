import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { fontSize } from "@mui/system";
import axios from "axios";
import { Alert, Space } from "antd";
import { Link } from "react-router-dom";

export default function Forgot() {
  const navigate = useNavigate();
  const { setAccount, login, logout } = useAuth();
  const [error, setError] = useState();

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onSubmit", //đây có mấy cái để kiểu ấn enter xong mới bỏ hiển thị lỗi
  });

  const p = <p style={{ color: "red", fontSize: "20px" }}> Login Fail</p>;

  const onSubmit = async (values) => {
    const { email } = values;
    console.log(values);
    var bodyFormData = new FormData();
    bodyFormData.append("ToEmail", email);
    bodyFormData.append("Subject", "Forgot password");
    // bodyFormData.append("ToEmail",email)

    try {
      const res = await axios({
        url: process.env.REACT_APP_BASE_URL + "/api/mail/sendMail",
        method: "post",
        data: bodyFormData,
      });

      setError("Your password has been changed, please check your mail !!!");

      // console.log("abc", res.data.data.token);
    } catch (error) {
      setError("Login failed");
    }
  };

  return (
    <div>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <h3 style={{ textAlign: "center" }}>Forgot password</h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email input */}
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    {...register("email", { required: true })}
                  />
                  <label className="form-label" htmlFor="form3Example3">
                    Email address
                  </label>
                </div>
                {errors?.email?.type === "required" && (
                  <p style={{ color: "red" }}>Email cannot be blank</p>
                )}
                {error ? (
                  <Alert
                    style={{ marginTop: "10px" }}
                    message={error}
                    type={"success"}
                    showIcon
                  />
                ) : null}

                {onSubmit}

                <div className="d-flex justify-content-between align-items-center">
                  <Link to="/login" className="text-body">
                    <span style={{ color: "blue", marginLeft: "200px" }}>
                      Already have an account
                    </span>
                  </Link>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                    value="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
