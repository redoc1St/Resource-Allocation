// import axios from 'axios'
import axios from "../../../src/api/request";
import useAuth from "../../component/hooks/useAuth";
import { Divider, Tag } from "antd";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import { GET_GENERAL_REQUEST, GET_GENERAL_REQUEST_BY_BU } from "../types";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import React, { useState } from "react";
const projectsApi = process.env.REACT_APP_BASE_URL;

const handleAccept = (value) => {
  console.log(value);
  if (value === "accepted") {
    return "accept";
  }
};

const handleStyleStatus = (status) => {
  if (status === "Approved") {
    return (
      <Tag style={{ width: "85px", textAlign: "center" }} color="#87d068">
        Approved
      </Tag>
    );
  } else if (status === "Waiting") {
    return (
      <Tag style={{ width: "85px", textAlign: "center" }} color="#62B0A8">
        Waiting
      </Tag>
    );
  } else if (status === "In Progress") {
    return "In Progress";
  } else if (status === "Reject") {
    return <Tag style={{ width: "85px", textAlign: "center" }} color="red">
      Rejected
    </Tag>;
  }
};

export const getGeneralRequest = () => async (dispatch) => {
  // dispatch({ type: SET_LOADING, payload: true })
  await axios
    .get(`${projectsApi}/api/Request/RolePlanning`)
    .then((res) => {
      const requests = res.data.map((item) => ({
        ...item,
        Date_start: new Date(item.Date_start).toLocaleDateString("fr-CA"),
        Date_end: new Date(item.Date_end).toLocaleDateString("fr-CA"),
        lastestTime: new Date(item.lastestTime).toLocaleString("es-CL"),
        Status: handleStyleStatus(item.Status),
      }));
      // dispatch({ type: SET_LOADING, payload: false })
      dispatch({ type: GET_GENERAL_REQUEST, payload: requests });
    })
    .catch((err) => console.log("Get role error", err));
};

export const getGeneralRequestByBU = (bu) => async (dispatch) => {
  // dispatch({ type: SET_LOADING, payload: true })
  await axios
    .get(`${projectsApi}/api/Request/RolePlanning/${bu}`)
    .then((res) => {
      const requests = res.data.map((item) => ({
        ...item,
        Date_start: new Date(item.Date_start).toLocaleDateString("fr-CA"),
        Date_end: new Date(item.Date_end).toLocaleDateString("fr-CA"),
        lastestTime: new Date(item.lastestTime).toLocaleString("es-CL"),
        Status: handleStyleStatus(item.Status),
      }));
      // dispatch({ type: SET_LOADING, payload: false })
      dispatch({ type: GET_GENERAL_REQUEST_BY_BU, payload: requests });
    })
    .catch((err) => console.log("Get role error", err));
};