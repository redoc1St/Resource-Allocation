import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Space } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getUsers,
  getUsersByName,
  getUsersByNameAStatus,
  getUsersByStatus,
} from "../../../Store/Actions/UserActions";
import BasicBreadcrumbs from "../../breadcrumbs/BasicBreadcrumbs";
import useAuth from "../../hooks/useAuth";
import Search from "../../option/Search";
import TableCandidate from "../../table/tableCandidate/TableCandidate";

export default function CandidateManage() {
  const { valueInput, setValueInput, statusCand, setStatusCand } = useAuth();
  const dispatch = useDispatch();

  const isChangeStatus = (e) => {
    console.log(e.target.value);
    setStatusCand(e.target.value);
  };

  useEffect(() => {
    // if (valueInput && statusCand) {
    //   // dispatch(getUsersByName(valueInput));
    //   dispatch(getUsersByNameAStatus(valueInput?valueInput:" ", statusCand));
    // } else if (statusCand == "all" && !valueInput) {
    //   dispatch(getUsers());
    // } else {
    //   dispatch(getUsersByNameAStatus(" ", statusCand));
    // }

    if (statusCand == "all") {
      valueInput ? dispatch(getUsersByName(valueInput)) : dispatch(getUsers());
      // if (valueInput) {
      //   dispatch(getUsersByName(valueInput));
      // } else dispatch(getUsers());
    } else {
      dispatch(
        getUsersByNameAStatus(valueInput ? valueInput : " ", statusCand)
      );
    }
  }, [statusCand, valueInput, dispatch]);
  return (
    <div>
      <h3
        style={{
          fontWeight: "bold",
          color: "#121843",
        }}
      >
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
        <TableCandidate />
      </div>
    </div>
  );
}
