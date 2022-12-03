
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScrollBar from "react-perfect-scrollbar";

import {
  getUsers,
  getUsersByName,
  getUsersByNameAStatus,
  
} from "../../../Store/Actions/UserActions";
import BasicBreadcrumbs from "../../breadcrumbs/BasicBreadcrumbs";
import PieChart from "../../Chart/Pie";
import useAuth from "../../hooks/useAuth";
import Search from "../../option/Search";
import TableCandidate from "../../table/tableCandidate/TableCandidate";
import { Card } from "antd";
import styled from "styled-components";
import DrawerAddUser from "./DrawerAddUser";
import { ROLES } from "../../../App";
export default function CandidateManage() {
  const { valueInput, user, statusCand, setStatusCand } = useAuth();
  const dispatch = useDispatch();
  const users = useSelector((state) => state?.Users?.users);

  const isChangeStatus = (e) => {
    console.log(e.target.value);
    setStatusCand(e.target.value);
  };


  var arr = new Array(0, 0, 0, 0, 0);
  let totalUsers= 0
  const calEmp = () => {
    users.map((item) => {
      totalUsers++
      for (let index = 1; index < arr.length; index++) {
        // const element = array[index];
        if (item.Department_id === index) {
          arr[index-1]++;
        } 
      }
    });
  };


  useEffect(() => {
    if (statusCand == "all") {
      valueInput ? dispatch(getUsersByName(valueInput)) : dispatch(getUsers());
    } else {
      dispatch(
        getUsersByNameAStatus(valueInput ? valueInput : " ", statusCand)
      );
    }
  }, [statusCand, valueInput, dispatch]);
  return (
    <div>
      <ScrollBar
        style={{
          overflow: "hidden",
          scrollMarginInlineEnd: "30px",
          width: "1280px",
          height: "700px",
        }}
      >
        <Pane>
          <h3
            style={{
              fontWeight: "bold",
              color: "#121843",
            }}
          >
            {calEmp()}
            {console.log(totalUsers)}
            Candidate Management
          </h3>
          <div>
            <BasicBreadcrumbs />
            <div style={{ display: "flex" }}>
              <Search placeholder="Enter candidate name" />
              <div className="form-group" style={{ marginLeft: "650px" }}>
                <h5>Status </h5>
                <select
                  // className="custom-select"
                  onChange={(event) => {
                    isChangeStatus(event);
                  }}
                  style={{ width: "100px" }}
                >
                  <option value="all">All</option>
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </select>
              </div>
            </div>
            <Card style={{ width: 300, height: "250px", marginLeft: "10px" }}>
              <p style={{ fontWeight: "bold" }}>Total Staff: {totalUsers}</p>
              <PieChart data={arr}/>
            </Card>
            <TableCandidate />
            {user?.UserType ==ROLES.ADMIN ? <DrawerAddUser/> :''} 
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
