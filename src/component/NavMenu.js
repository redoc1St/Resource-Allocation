import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { LayoutFilled, UserOutlined } from "@ant-design/icons";
import useAuth from "./hooks/useAuth";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { ROLES } from "../App";
export default function NavMenu() {
  const { user } = useAuth();
  console.log(user?.UserType + "," + ROLES.ADMIN + "," + ROLES.LEADER);
  return (
    <div id="layoutSidenav">
      <div id="layoutSidenav_nav">
        {/* {
          onclickShowLeft ?  <NavMenuPane style={{marginLeft:'-100%'}}> : <NavMenuPane/> 
        } */}

        <NavMenuPane>
          <nav
            className="sb-sidenav accordion sb-sidenav-white"
            id="sidenavAccordion"
          >
            <div className="sb-sidenav-menu">
              <div className="nav">
                <>
                
                  <div className="sb-sidenav-menu-heading">MAIN MENU</div>
                  <NavLink className="nav-link"   to="/userManage" >
                    <LayoutFilled style={{ margin: "5px" }} />
                    Staff List
                  </NavLink>
                </>

                <div className="sb-sidenav-menu-heading">Interface</div>
                <Link
                  className="nav-link collapsed"
                  to="/"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseLayouts"
                  aria-expanded="false"
                  aria-controls="collapseLayouts"
                >
                  <UserOutlined style={{ margin: "5px" }} />
                  {/* <div className="sb-nav-link-icon">
                  <i className="fas fa-columns" />
                </div> */}
                  Workforce Management
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down" />
                  </div>
                </Link>
                <div
                  className="collapse"
                  id="collapseLayouts"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <NavLink className="nav-link" to="/resourceAllocation">
                      <CircleOutlinedIcon
                        style={{ fontSize: "12px", color: "black" }}
                      />{" "}
                      &nbsp;&nbsp; Resource Allocation
                    </NavLink>
                    <NavLink className="nav-link" to="/resourcePlaning">
                      <CircleOutlinedIcon
                        style={{ fontSize: "12px", color: "black" }}
                      />{" "}
                      &nbsp;&nbsp; Resource Planing
                    </NavLink>
                    <NavLink className="nav-link" to="/resourcePool">
                      <CircleOutlinedIcon
                        style={{ fontSize: "12px", color: "black" }}
                      />{" "}
                      &nbsp;&nbsp; Resource Pool
                    </NavLink>
                    <NavLink className="nav-link" to="/requests">
                      <CircleOutlinedIcon
                        style={{ fontSize: "12px", color: "black" }}
                      />{" "}
                      &nbsp;&nbsp; Requests
                    </NavLink>
                  </nav>
                </div>
                <Link
                  className="nav-link collapsed"
                  to="/"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapsePages"
                  aria-expanded="false"
                  aria-controls="collapsePages"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-book-open" />
                  </div>
                  Data Information
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down" />
                  </div>
                </Link>
                <div
                  className="collapse"
                  id="collapsePages"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav
                    className="sb-sidenav-menu-nested nav accordion"
                    id="sidenavAccordionPages"
                  >
                    <NavLink className="nav-link" to="/report">
                      <CircleOutlinedIcon
                        style={{ fontSize: "12px", color: "black" }}
                      />{" "}
                      &nbsp;&nbsp; Report
                    </NavLink>
                    {/* <Link
                      className="nav-link collapsed"
                      to="/"
                      data-bs-toggle="collapse"
                      data-bs-target="#pagesCollapseAuth"
                      aria-expanded="false"
                      aria-controls="pagesCollapseAuth"
                    >
                      Authentication
                      <div className="sb-sidenav-collapse-arrow">
                        <i className="fas fa-angle-down" />
                      </div>
                    </Link>
                    <div
                      className="collapse"
                      id="pagesCollapseAuth"
                      aria-labelledby="headingOne"
                      data-bs-parent="#sidenavAccordionPages"
                    >
                      <nav className="sb-sidenav-menu-nested nav">
                        <a className="nav-link" href="login.html">
                          Login
                        </a>
                        <a className="nav-link" href="register.html">
                          Register
                        </a>
                        <a className="nav-link" href="password.html">
                          Forgot Password
                        </a>
                      </nav>
                    </div> */}
                    <Link
                      className="nav-link collapsed"
                      to="/"
                      data-bs-toggle="collapse"
                      data-bs-target="#pagesCollapseError"
                      aria-expanded="false"
                      aria-controls="pagesCollapseError"
                    >
                      Error
                      <div className="sb-sidenav-collapse-arrow">
                        <i className="fas fa-angle-down" />
                      </div>
                    </Link>
                    {/* <div
                      className="collapse"
                      id="pagesCollapseError"
                      aria-labelledby="headingOne"
                      data-bs-parent="#sidenavAccordionPages"
                    >
                      <nav className="sb-sidenav-menu-nested nav">
                        <a className="nav-link" href="401.html">
                          401 Page
                        </a>
                        <a className="nav-link" href="404.html">
                          404 Page
                        </a>
                        <a className="nav-link" href="500.html">
                          500 Page
                        </a>
                      </nav>
                    </div> */}
                  </nav>
                </div>
                  {/* <div className="sb-sidenav-menu-heading">Addons</div>
                  <a className="nav-link" href="charts.html">
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-chart-area" />
                    </div>
                    Charts
                  </a>
                  <a className="nav-link" href="tables.html">
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-table" />
                    </div>
                    Tables
                  </a> */}
              </div>
            </div>
          </nav>
        </NavMenuPane>
      </div>
    </div>
  );
}

const NavMenuPane = styled.div`
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  height: 100vh;
  z-index: 1000;
  width: 100%;
  background-color: #ecfeff;
  /* margin-left:-100%; */
  position: fixed;
  /* max-height: auto; */
`;
