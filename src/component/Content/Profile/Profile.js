import React, { useEffect, useState } from "react";
import ScrollBar from "react-perfect-scrollbar";
import styled from "styled-components";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { Alert, Space } from "antd";
import "./index.css";
import axios from "axios";
export default function Profile() {
  const [editButton, setEditButton] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const { logout, user, verifyUserInfo } = useAuth();
  const [error, setError] = useState();
  const [typeMessage, setTypeMessage] = useState("error");
  const [passwordVisible, setPasswordVisible] = React.useState(true);

  console.log(user);
  const changeStatus = (e) => {
    setEditButton(!editButton);
    e.preventDefault();
  };
  useEffect(() => {
    verifyUserInfo();
  }, []);
  const onClickLogOut = () => {
    // setAccount(false);
    logout();
    // Navigate("/login");
  };
  const showButton = () => {
    if (!editButton) {
      return (
        <div className="col-sm-12">
          <button className="btn btn-info " onClick={changeStatus}>
            Edit
          </button>
        </div>
      );
    } else {
      return (
        <div className="col d-flex justify-content-end">
          <button
            className="btn btn-primary"
            type="submit"
            onClick={changeStatus}
          >
            Save Changes
          </button>
        </div>
      );
    }
  };

  const onClickShowPass = () => {
    setPasswordVisible(!passwordVisible);
  };
  const onClickChange = () => {
    setShowChangePass(!showChangePass);
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      newPass: "",
      // pName:
      //   pId: data?.data?.pId,
      //   sdp: data?.data?.sdp,
      //   unit: data?.data?.unit,
    },
  });
  const onSubmit = async (values) => {
    console.log(values);
    if (values.conPass != values.newPass) {
      setError("Confirm password does not match ");
    } else {
      if (user?.Password != values.curPass) {
        setTypeMessage("error");

        setError("Current password incorrect ");
      } else {
        try {
          const res = await axios({
            url:
              process.env.REACT_APP_BASE_URL +
              `/api/user/changePass/${user.User_id}`,
            method: "PUT",
            data: {
              Password: values.newPass,
            },
          });
          setTypeMessage("success");
          setError("Change password successfully");
        } catch (err) {
          console.log(err);
        }
      }
    }
  };
  const changePass = () => {
    if (showChangePass === true) {
      return (
        <>
          <div
            className="card border-info  mb-3 mt-2"
            style={{ width: "500px", margin: "left" }}
          >
            {" "}
            {/* mb marginbot mt margin top */}
            <div
              className="card-header"
              style={{ textAlign: "center", fontWeight: "bold" }}
            >
              Change Password
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="card-body text-secondary">
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>Current Password</label>
                  <div style={{ display: "flex" }}>
                  {passwordVisible ?

                      <input
                      required
                        {...register("curPass")}
                        className="form-control"
                        type="password"
                        placeholder="••••••"
                      /> : <input required
                        {...register("curPass")}
                        className="form-control"
                        type="text"
                        placeholder="••••••"></input>}
                      <i
                        className="bi bi-eye-slash"
                        onClick={onClickShowPass}
                        style={{
                          fontSize: "25px",
                          cursor: "pointer",
                          marginLeft: "-40px",
                        }}
                        id="togglePassword"
                      ></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>New Password</label>
                  <div style={{ display: "flex" }}>
                     
                      <input
                       required
                        {...register("newPass", {
                          required: true,
                          minLength: 6,
                        })}
                        className="form-control"
                        type="password"
                        placeholder="••••••"
                      />
                       {/* <i
                        className="bi bi-eye-slash"
                        onClick={onClickShowPass}
                        style={{
                          fontSize: "25px",
                          cursor: "pointer",
                          marginLeft: "-40px",
                        }}
                        id="togglePassword"
                      ></i> */}
                      </div>
                    </div>
                  </div>
                </div>
                {errors?.password?.type === "required" && (
                  <p style={{ color: "red" }}>Password không được để trống</p>
                )}
                {errors?.newPass?.type === "minLength" && (
                  <p style={{ color: "red" }}>Password phải lớn hơn 6 ký tự</p>
                )}

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>
                        Confirm{" "}
                        <span className="d-none d-xl-inline">Password</span>
                      </label>
                  <div style={{ display: "flex" }}>

                      <input
                        {...register("conPass")}
                        className="form-control"
                        type="password"
                        placeholder="••••••"
                      />
                        {/* <i
                        className="bi bi-eye-slash"
                        onClick={onClickShowPass}
                        style={{
                          fontSize: "25px",
                          cursor: "pointer",
                          marginLeft: "-40px",
                        }}
                        id="togglePassword"
                      ></i> */}
                      </div>
                    </div>
                  </div>
                </div>

                {error ? (
                  <Alert
                    style={{ marginTop: "10px" }}
                    message={error}
                    type={typeMessage == "error" ? "error" : "success"}
                    showIcon
                  />
                ) : null}
                <div className="form-group" style={{ marginTop: "15px" }}>
                  <button
                    type="submit"
                    // onClick={() =>
                    //   this.props.getNewUser(
                    //     this.state.name,
                    //     this.state.tel,
                    //     this.state.permission
                    //   )
                    // }
                    className="btn btn-block btn-warning "
                  >
                    Change
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      );
    }
  };

  return (
    <div>
      <ScrollBar
        style={{
          overflow: "hidden",
          scrollMarginInlineEnd: "50px",
          width: "1280px",
          height: "700px",
        }}
      >
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
        <Pane>
          <div className="row flex-lg-nowrap">
            <div className="col">
              <div className="row">
                <div className="col mb-3" style={{ width: "900px" }}>
                  <div className="card">
                    <div className="card-body">
                      <div className="e-profile">
                        <div className="row">
                          <div className="col-12 col-sm-auto mb-3">
                            {/* <div className="mx-auto" style={{ width: "140px" }}> */}
                            <img
                              style={{ width: "160px" }}
                              src="https://cdn1.iconfinder.com/data/icons/business-and-finance-flat-4/128/Personnel_man_staff_avatar_people_star_rating-512.png"
                            ></img>
                            {/* <div
                                className="d-flex justify-content-center align-items-center rounded"
                                style={{
                                  height: "140px",
                                  backgroundColor: "rgb(233, 236, 239)",
                                }}
                              >
                                <span
                                  style={{
                                    color: "rgb(166, 168, 170)",
                                    font: "bold 8pt Arial",
                                  }}
                                >
                                  140x140
                                </span>
                              </div> */}
                            {/* </div> */}
                          </div>
                          <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                            <div className="text-center text-sm-left mb-2 mb-sm-0">
                              <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">
                                {user?.Fullname}
                              </h4>
                              <p className="mb-0">{user?.Email}</p>
                              <div className="mt-2">
                                <button
                                  className="btn btn-primary"
                                  type="button"
                                >
                                  <i className="fa fa-fw fa-camera" />
                                  <span>Change Photo</span>
                                </button>
                              </div>
                            </div>
                            <div
                              className="text-center text-sm-right"
                              style={{ fontSize: "20px" }}
                            >
                              <span className=" text-secondary">
                                {user?.UserType}
                              </span>
                              <div className="text-muted">
                                <small>{new Date(user?.Start_Day?.split("T")[0]).toLocaleDateString("es-CL")}</small>
                              </div>
                            </div>
                          </div>
                        </div>
                        <ul className="nav nav-tabs">
                          <li className="nav-item">
                            <a className="active nav-link">Settings</a>
                          </li>
                        </ul>
                        <div className="tab-content pt-3">
                          <div className="tab-pane active">
                            <form className="form" noValidate>
                              <div className="row">
                                <div className="col">
                                  <div className="row">
                                    <div className="col-5">
                                      <div className="form-group">
                                        <label>Full Name</label>
                                        <input
                                          className="form-control"
                                          type="text"
                                          defaultValue={user?.Fullname || ""}
                                          disabled={!editButton}
                                        />
                                      </div>
                                    </div>
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Username</label>
                                        {/* {editButton ?<input
                                          type="text"
                                          className="form-control"
                                        /> : <input
                                          type="text"
                                          className="form-control" disabled
                                        />} */}
                                        <input
                                          value={user?.Username || ""}
                                          type="text"
                                          className="form-control"
                                          disabled
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Address</label>
                                        <input
                                          className="form-control"
                                          type="text"
                                          defaultValue={user?.Address || ""}
                                          disabled={!editButton}
                                        />
                                      </div>
                                    </div>
                                    <div className="col">
                                      <div className="form-group">
                                        <label>BirthDay</label>
                                        <input
                                          value={new Date(user?.BirthDay?.split("T")[0]).toLocaleDateString("es-CL")}
                                          type="text"
                                          className="form-control"
                                          disabled
                                        />
                                      </div>
                                    </div>
                                    <div className="col-2">
                                      <div className="form-group">
                                        <label>Department</label>
                                        <input
                                          value={"BU " + user?.Department_id}
                                          type="text"
                                          className="form-control"
                                          disabled
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  {/* <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Email</label>
                                        <input
                                          value={user.Email}
                                          className="form-control"
                                          type="text"
                                          placeholder="user@example.com"
                                          disabled={!editButton}
                                        />
                                      </div>
                                    </div>
                                  </div> */}
                                  <div className="row">
                                    <div className="col mb-3">
                                      <div className="form-group">
                                        <label>About</label>
                                        <textarea
                                          className="form-control"
                                          rows={3}
                                          placeholder="My Bio"
                                          defaultValue={""}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="row">{showButton()}</div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 col-sm-6 mb-3">
                      <div className="mb-2">
                        <b
                          onClick={onClickChange}
                          style={{ cursor: "pointer" }}
                        >
                          Change Password
                        </b>
                      </div>
                    </div>
                  </div>
                  {changePass()}
                </div>

                <div className="col-2">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="px-xl-3">
                        <button className="btn btn-block btn-secondary">
                          <i className="fa fa-sign-out" />
                          <span onClick={onClickLogOut}>Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <h6 className="card-title font-weight-bold">Support</h6>
                      <p className="card-text">
                        Get fast, free help from our friendly assistants.
                      </p>
                      <button type="button" className="btn btn-primary">
                        Contact Us
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Pane>
      </ScrollBar>
    </div>
  );
}

const Pane = styled.div`
  height: 150px;

  /* width: 600px; */
`;
