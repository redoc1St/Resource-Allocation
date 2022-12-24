import styled from "styled-components";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Popover } from "antd";
import { Divider } from "antd";

import "./navBar.css";
import Badge from "@mui/material/Badge";

import NotificationsNoneTwoToneIcon from "@mui/icons-material/NotificationsNoneTwoTone";

import useAuth from "./hooks/useAuth";
import { hover } from "@testing-library/user-event/dist/hover";
import { Opacity } from "@mui/icons-material";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import axios from "axios";
import { getNotiByUserId } from "../Store/Actions/NotificationActions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

export default function Navbar() {
  const { logout, onclickShowLeft, setOnclickShowLeft, user } = useAuth();
  const notiList = useSelector((state) => state.Notification.notiList);
  const dispatch = useDispatch();
  const [onBlueNoti, setOnBlueNoti] = useState(true);
  useEffect(() => {
    dispatch(getNotiByUserId(user?.User_id));
  }, []);
  let arr = [];
  const listContent = notiList.map((item) => {
    arr.push(item.content);
  });
  // notiList.map((item) => {
  //   if (moment(new Date(item.noti_time)).fromNow() == "a few seconds ago") {
  //     setOnBlueNoti(true);
  //   }
  // });
  const items = notiList.map((item, index) => (
    <div style={{ display: "flex" }} key={index}>
      <img
        width={70}
        height={70}
        src="https://w7.pngwing.com/pngs/537/580/png-transparent-bell-notification-communication-information-icon.png"
      ></img>
      <div style={{ marginLeft: "10px" }}>
        <h6>{item.content}</h6>
        {/* <p> ... {moment.utc(item.noti_time).local().startOf('seconds').fromNow()}</p> */}
        <p> {moment(new Date(item.noti_time)).fromNow()}</p>

        <Divider />
      </div>
    </div>
  ));

  const onClickLogOut = () => {
    logout();
  };
  const onClickBaGach = () => {
    document.body.classList.toggle("sb-sidenav-toggled");
    localStorage.setItem(
      "sb|sidebar-toggle",
      document.body.classList.contains("sb-sidenav-toggled")
    );
    setOnclickShowLeft(!onclickShowLeft);
  };
  const clickIc = () => {
    setOnBlueNoti(false);
  };
  return (
    <NavbarPane>
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-white">
        <span className="navbar-brand ps-3" style={{ color: "black" }}>
          HR Allocation
        </span>
        <button
          style={{ color: "black" }}
          className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          id="sidebarToggle"
          onClick={() => onClickBaGach()}
        >
          <svg
            className="svg-inline--fa fa-bars"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="bars"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            data-fa-i2svg
          >
            <path
              fill="currentColor"
              d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"
            />
          </svg>
        </button>
        {listContent}
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4 ">
          <div
            style={{
              display: "flex",
              position: "absolute",
              right: "20px",
              top: "10px",
            }}
          >
            <Popover
              placement="bottom"
              title={"Notifications"}
              content={items}
              trigger="click"
              style={{ width: "100px" }}
            >
              <NotificationsNoneTwoToneIcon
                onClick={() => clickIc()}
                color="action"
                style={{ fontSize: "25px", marginTop: "7px" }}
              ></NotificationsNoneTwoToneIcon>
              {onBlueNoti ? (
                <Badge
                  variant="dot"
                  badgeContent=""
                  style={{ margin: "8px 5px" }}
                  color="primary"
                ></Badge>
              ) : (
                ""
              )}
            </Popover>

            <li className="nav-item dropdown ">
              <Link
                className="nav-link dropdown-toggle "
                id="navbarDropdown"
                to="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span>{user?.Fullname}</span>
                <svg
                  className="svg-inline--fa fa-user fa-fw "
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="user"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  data-fa-i2svg
                >
                  <path
                    fill="currentColor"
                    d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"
                  />
                </svg>
              </Link>
              <ul
                className="dropdown-menu dropdown-menu-end "
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item" href="#!">
                    Activity Log
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    onClick={() => onClickLogOut()}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
          </div>
        </ul>
      </nav>
    </NavbarPane>
  );
}
const NavbarPane = styled.div`
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  background-color: #fae4d7;
`;
