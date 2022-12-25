import "./App.css";
import Navbar from "./component/Navbar";
import NavMenu from "./component/NavMenu";
// import { REACT_APP_BASE_URL } from "../"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  NavLink,
  useNavigate,
  Navigate,
} from "react-router-dom";
import MainContent from "./component/Content/MainContent/MainContent";
import styled from "styled-components";
import ResourcePlanning from "./component/Content/resourcePlanning/ResourcePlanning";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import Login from "./component/login/Login";

import PrivateRoute from "./component/Route/PrivateRoute";
import GuestRouter from "./component/Route/GuestRoute";
// import BasicBreadcrumbs from "./component/breadcrumbs/BasicBreadcrumbs";
import ResourcePool from "./component/Content/MainContent/resourcePool/ResourcePool";
import CandidateManage from "./component/Content/candidateManage/CandidateManage";
import RequestPage from "./component/Content/requestPage/RequestPage";
import Profile from "./component/Content/Profile/Profile";
import { useDispatch } from "react-redux";
import { getProjects } from "./Store/Actions/ProjectActions";
import axios from "./api/request";
import Forgot from "./component/login/forgot/Forgot.js";
import Report from "./component/Content/report/Report";
import ReportRSPLanning from "./component/table/tableReport/ReportRSPlanning/ReportRSPLanning";
import RequireAuth from "./component/Route/RequireAuth";
import Unauthorized from "./component/Content/Authorization/Unauthorized";
// import '../src/api/request'

export const ROLES = {
  ADMIN: "admin",
  LEADER: "leader",
  EMPLOYEE: "employee",
};

export const AuthContext = React.createContext(); //chuyền sang cái khác

function App() {
  // const [account, setAccount] = useState(false);
  // const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    status: "idle",
    data: null,
  });

  // console.log(userInfo);
  const verifyUserInfo = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUserInfo({ status: "fail", data: null });
      return;
    } else {
      try {
        const res = await axios.get("/api/user/getuser");
        // if (res.data.success) {
        setUserInfo({ status: "success", data: res.data[0] });
        //   } else {
        //     setUserInfo({ status: "success", data: 456 });
        //   }
      } catch (error) {
        setUserInfo({ status: "success", data: 789 });
      }
    }
  };

  const login = ({ token }) => {
    localStorage.setItem("token", token);
    // console.log(userInfo.data);
    window.location.href = "/resourceAllocation";
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserInfo({ status: "success", data: null });
  };

  const [onclickShowLeft, setOnclickShowLeft] = useState(true);
  const dispatch = useDispatch();

  const [moreRow, setMoreRow] = useState(0);

  const [valueInput, setValueInput] = useState({ empSearch: "" });

  const [statusCand, setStatusCand] = useState("");

  const [quantity, setQuantity] = useState([]);

  useEffect(() => {
    verifyUserInfo();
  }, [dispatch]);

  return (
    <AuthContext.Provider
      value={{
        onclickShowLeft,
        setOnclickShowLeft,
        moreRow,
        setMoreRow,
        valueInput,
        setValueInput,
        quantity,
        setQuantity,
        statusCand,
        setStatusCand,
        user: userInfo.data,
        login,
        logout,
        verifyUserInfo,
      }}
    >
      <Router>
        <div className="App">
          {/* {userInfo.data === 1 ? <Navbar /> : ""}
          <ContentContainer>
            {userInfo.data === 1 ? <NavMenu /> : ""} */}
          {userInfo.data === null ? "" : <Navbar />}
          <ContentContainer>
            {userInfo.data === null ? "" : <NavMenu />}
            {/* <Navbar />
          <ContentContainer>
            <NavMenu /> */}
            {/* {
            onclickShowLeft ? <div className="mainContent"  style={{marginLeft: "245px" }}> : <div className="mainContent"  style={{marginLeft: "245px" }}>
          } */}
            <div
              className="mainContent"
              style={
                onclickShowLeft
                  ? { marginLeft: "245px" }
                  : { marginLeft: "50px" }
              }
            >
              <Routes>
                <Route element={<GuestRouter />}>
                  <Route exact path="/" element={<Login />} />

                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/forgot" element={<Forgot />} />
                </Route>
                <Route element={<PrivateRoute />}>
                  <Route
                    exact
                    path="/resourceAllocation"
                    element={<MainContent />}
                  />
                  <Route
                    element={
                      <RequireAuth allowedRoles={[ROLES.LEADER, ROLES.ADMIN]} />
                    }
                  >
                    <Route
                      exact
                      path="/userManage"
                      element={<CandidateManage />}
                    />
                  </Route>

                  <Route
                    exact
                    path="/resourcePlaning/:pName"
                    element={<ResourcePlanning />}
                  />
                  <Route
                    exact
                    path="/resourcePlaning"
                    element={<ResourcePlanning />}
                  />
                  <Route
                    element={
                      <RequireAuth allowedRoles={[ROLES.LEADER, ROLES.ADMIN]} />
                    }
                  >
                    <Route
                      exact
                      path="/resourcePool"
                      element={<ResourcePool />}
                    />

                    <Route
                      exact
                      path="/resourcePool/:code/:r/:l/:s/:bu/:roleId"
                      element={<ResourcePool />}
                    />
                  </Route>
                  <Route
                    element={
                      <RequireAuth allowedRoles={[ROLES.LEADER, ROLES.ADMIN]} />
                    }
                  >
                    <Route exact path="/requests" element={<RequestPage />} />
                  </Route>
                  <Route
                    element={
                      <RequireAuth allowedRoles={[ROLES.LEADER, ROLES.ADMIN]} />
                    }
                  >
                    <Route exact path="/report" element={<Report />} />
                  </Route>
                  <Route
                    exact
                    path="/report/resourcePlaning/:pName"
                    element={<ReportRSPLanning />}
                  />
                  <Route
                    exact
                    path="/unauthorized"
                    element={<Unauthorized />}
                  />

                  <Route exact path="/profile" element={<Profile />} />
                </Route>
              </Routes>
            </div>
          </ContentContainer>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
const ContentContainer = styled.div`
  /* max-width: 1280px; */
  display: flex;
  /* align-items: center; */
  position: fixed;
  justify-content: space-between;
  /* width: 100%; */
  /* z-index: 1000; */
  .mainContent {
    margin-left: 40px;
    margin-top: 10px;
  }
`;
