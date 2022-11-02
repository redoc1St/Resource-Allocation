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
// import '../src/api/request'
export const AuthContext = React.createContext(); //chuyền sang cái khác

function App() {
  const [account, setAccount] = useState(false);
// console.log(process.env.REACT_APP_BASE_URL)
  const [onclickShowLeft, setOnclickShowLeft] = useState(true);
  const dispatch = useDispatch();

  const [moreRow, setMoreRow] = useState(0);

  const [valueInput, setValueInput] = useState("");

const [statusCand, setStatusCand]=  useState("")

  const [quantity, setQuantity]= useState([])

  useEffect(() => {

      dispatch(getProjects());
    
  }, [dispatch]);

  return (
    <AuthContext.Provider
      value={{
        setAccount,
        account,
        onclickShowLeft,
        setOnclickShowLeft,
        moreRow,
        setMoreRow,
        valueInput,
        setValueInput,
        quantity,
        setQuantity,statusCand, setStatusCand
      }}
    >
      <Router>
        <div className="App">
          {/* {account === true ? <Navbar /> : ""}
          <ContentContainer>
            {account === true ? <NavMenu /> : ""} */}

          <Navbar />
          <ContentContainer>
            <NavMenu />
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
                {/* <Route element={<PrivateRoute />}> */}
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

                <Route exact path="/resourcePool" element={<ResourcePool />} />
                <Route exact path="/requests" element={<RequestPage />} />
                <Route exact path="/profile" element={<Profile />} />
                
                {/* </Route> */}
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
