import React, { useEffect, useState } from "react";
import "./index.css";
import { useForm, useWatch } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { fontSize } from "@mui/system";
import axios from "axios";
import { Alert, Space } from "antd";

export default function Login() {
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
      password: "",
    },
    mode: "onSubmit", //đây có mấy cái để kiểu ấn enter xong mới bỏ hiển thị lỗi
  });

  const p = <p style={{ color: "red", fontSize: "20px" }}> Login Fail</p>;

  const onSubmit = async (values) => {
    const { email, password } = values;
    console.log(values);
    try {
      const res = await axios({
        url: process.env.REACT_APP_BASE_URL + "/api/user/login",
        method: "post",
        data: { email, password },
      });
      if (res.data) {
        // localStorage.setItem("token", res.data);
        // navigate('/candidateManage')
        // console.log('thanh cong')
        login({
          // _id:res.data.data._id,
          token: res.data,
        });

        // login({
        //   _id: res.data.data._id,
        //   token: res.data.data.token,
        //   returnUrl: searchParams.get("returnUrl") || "",
        // });
      } else {
        setError("email or password is incorrect");
      }

      // console.log("abc", res.data.data.token);
    } catch (error) {
      setError("Login failed");
    }

    // try {
    //   /// axios
    // } catch (error) {}
    // console.log(username);
    // if (username === accountLogin.username && password === accountLogin.password) {
    //   setAccount(true);
    //   navigate("/resourceAllocation");
    // }
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
                  <p style={{ color: "red" }}>Email không được để trống</p>
                )}
                {/* Password input */}
                <div className="form-outline mb-3">
                  <input
                    name="password"
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    {...register("password", { required: true, minLength: 6 })}
                  />
                  <label className="form-label" htmlFor="form3Example4">
                    Password
                  </label>
                </div>
                {errors?.password?.type === "required" && (
                  <p style={{ color: "red" }}>Password không được để trống</p>
                )}
                {errors?.password?.type === "minLength" && (
                  <p style={{ color: "red" }}>Password phải lớn hơn 6 ký tự</p>
                )}
                {error ? (
                  <Alert
                    style={{ marginTop: "10px" }}
                    message={"Email or password is incorrect"}
                    type={"error"}
                    showIcon
                  />
                ) : null}
                {onSubmit}

                <div className="d-flex justify-content-between align-items-center">
                  {/* Checkbox */}

                  <div className="form-check mb-0">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      defaultValue
                      id="form2Example3"
                    />

                    <label className="form-check-label" htmlFor="form2Example3">
                      Remember me
                    </label>
                  </div>
                  <a href="#!" className="text-body">
                    Forgot password?
                  </a>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                    value="submit"
                  >
                    Login
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
