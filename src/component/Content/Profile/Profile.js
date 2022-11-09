import React, { useState } from "react";
import ScrollBar from "react-perfect-scrollbar";
import styled from "styled-components";

import "./index.css";
export default function Profile() {
  const [editButton, setEditButton] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const changeStatus = (e) => {
    setEditButton(!editButton);
    e.preventDefault();
  };
  const showButton = () => {
    if (!editButton) {
      return (
        <div className="col-sm-12">
          <button className="btn btn-info " href="#" onClick={changeStatus}>
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

  const onClickChange = () => {
    setShowChangePass(!showChangePass);
  };

  const changePass = () => {
    if (showChangePass === true) {
      return (
        <>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>
                  Confirm <span className="d-none d-xl-inline">Password</span>
                </label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="••••••"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Current Password</label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="••••••"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>New Password</label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="••••••"
                />
              </div>
            </div>
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
                            <div className="mx-auto" style={{ width: "140px" }}>
                              <div
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
                              </div>
                            </div>
                          </div>
                          <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                            <div className="text-center text-sm-left mb-2 mb-sm-0">
                              <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">
                                Duc Quang
                              </h4>
                              <p className="mb-0">@johnny.s</p>
                              <div className="text-muted">
                                <small>Last seen 2 hours ago</small>
                              </div>
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
                            <div className="text-center text-sm-right">
                              <span className="badge badge-secondary">
                                administrator
                              </span>
                              <div className="text-muted">
                                <small>Joined 14 Dec 2000</small>
                              </div>
                            </div>
                          </div>
                        </div>
                        <ul className="nav nav-tabs">
                          <li className="nav-item">
                            <a href className="active nav-link">
                              Settings
                            </a>
                          </li>
                        </ul>
                        <div className="tab-content pt-3">
                          <div className="tab-pane active">
                            <form className="form" noValidate>
                              <div className="row">
                                <div className="col">
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Full Name</label>
                                        <input
                                          className="form-control"
                                          type="text"
                                          value="Duc Quang"
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
                                          type="text"
                                          className="form-control"
                                          disabled={!editButton}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Email</label>
                                        <input
                                          className="form-control"
                                          type="text"
                                          placeholder="user@example.com"
                                        />
                                      </div>
                                    </div>
                                  </div>
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
                                {changePass()}

                                {/* <div className="col-12 col-sm-5 offset-sm-1 mb-3">
                                  <div className="mb-2">
                                    <b>Keeping in Touch</b>
                                  </div>
                                  <div className="row">
                                    <div className="col">
                                      <label>Email Notifications</label>
                                      <div className="custom-controls-stacked px-2">
                                        <div className="custom-control custom-checkbox">
                                          <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="notifications-blog"
                                            defaultChecked
                                          />
                                          <label
                                            className="custom-control-label"
                                            htmlFor="notifications-blog"
                                          >
                                            Blog posts
                                          </label>
                                        </div>
                                        <div className="custom-control custom-checkbox">
                                          <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="notifications-news"
                                            defaultChecked
                                          />
                                          <label
                                            className="custom-control-label"
                                            htmlFor="notifications-news"
                                          >
                                            Newsletter
                                          </label>
                                        </div>
                                        <div className="custom-control custom-checkbox">
                                          <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="notifications-offers"
                                            defaultChecked
                                          />
                                          <label
                                            className="custom-control-label"
                                            htmlFor="notifications-offers"
                                          >
                                            Personal Offers
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div> */}
                              </div>
                              <div className="row">{showButton()}</div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-2">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="px-xl-3">
                        <button className="btn btn-block btn-secondary">
                          <i className="fa fa-sign-out" />
                          <span>Logout</span>
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
