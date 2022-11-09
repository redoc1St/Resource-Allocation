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
import axios from "axios";
// import '../src/api/request'
export const AuthContext = React.createContext(); //chuyền sang cái khác

function App() {
  // const [account, setAccount] = useState(false);
  // const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    status: "idle",
    data: null,
  });
  console.log(userInfo);
  const verifyUserInfo = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUserInfo({ status: "fail", data: null });
      return;
    }else
    // try {
    // const res = await axios.get("/api/auth/verify");
    // if (res.data.success) {
    setUserInfo({ status: "success", data: 1 });
    //   } else {
    //     setUserInfo({ status: "success", data: 456 });
    //   }
    // } catch (error) {
    //   // setUserInfo({ status: "success", data: 789 });
    // }
  };

  const login = ({ token }) => {
    localStorage.setItem("token", token);
    // navigate('/candidateManage')      //không dùng đc cái này vì k render lại => k gọi được verifyUserInfo trong useEffect
    console.log(userInfo.data);
    // Navigate('/candidateManage')
    window.location.href = "/candidateManage"; // ?? gần giống ||, kiểu nếu không có returnUrl thì trả về trang home
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserInfo({ status: "success", data: null });
  };

  // console.log(process.env.REACT_APP_BASE_URL)
  const [onclickShowLeft, setOnclickShowLeft] = useState(true);
  const dispatch = useDispatch();

  const [moreRow, setMoreRow] = useState(0);

  const [valueInput, setValueInput] = useState("");

  const [statusCand, setStatusCand] = useState("");

  const [quantity, setQuantity] = useState([]);

  useEffect(() => {
    dispatch(getProjects());
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
      }}
    >
      <Router>
        <div className="App">
          {userInfo.data === 1 ? <Navbar /> : ""}
          <ContentContainer>
            {userInfo.data === 1 ? <NavMenu /> : ""}

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
                  <Route exact path="/login" element={<Login />} />
                </Route>
                <Route element={<PrivateRoute />}>
                  <Route
                    exact
                    path="/candidateManage"
                    element={<CandidateManage />}
                  />
                  <Route
                    exact
                    path="/resourceAllocation"
                    element={<MainContent />}
                  />
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
                    exact
                    path="/resourcePool"
                    element={<ResourcePool />}
                  />
                   <Route
                    exact
                    path="/resourcePool/:code/:r/:l/:s"
                    element={<ResourcePool />}
                  />
                  <Route exact path="/requests" element={<RequestPage />} />
                  <Route exact path="/profile" element={<Profile />} />
                </Route>
                {/* {console.log(onclickShowLeft)} */}
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
