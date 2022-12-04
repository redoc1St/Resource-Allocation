// import axios from 'axios'
import axios from "../../../src/api/request";
import useAuth from "../../component/hooks/useAuth";
import { Divider, Tag } from "antd";

import { GET_SPEC_REQUEST, GET_SPEC_REQUEST_BY_BU } from "../types";
const projectsApi = process.env.REACT_APP_BASE_URL;
const handleStyleStatus = (status) => {
  if (status === "Approved") {
    return (
      <Tag style={{ width: "85px", textAlign: "center" }} color="#87d068">
        Approved
      </Tag>
    );
  } else if (status === "waiting") {
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
  } else if (status === "") {
  }
};
export const getSpecRequest = () => async (dispatch) => {
  // dispatch({ type: SET_LOADING, payload: true })
  await axios
    .get(`${projectsApi}/api/Request/employee`)
    .then((res) => {
      const requests = res.data.map((item) => ({
        ...item,
        Date_start: new Date(item.Date_start).toLocaleDateString("fr-CA"),
        Date_end: new Date(item.Date_end).toLocaleDateString("fr-CA"),
        lastestTime: new Date(item.lastestTime).toLocaleString("es-CL"),
        Status: handleStyleStatus(item.status),
      }));

      // dispatch({ type: SET_LOADING, payload: false })
      dispatch({ type: GET_SPEC_REQUEST, payload: requests });
    })
    .catch((err) => console.log("Get role error", err));
};

export const getSpecRequestByBU = (bu) => async (dispatch) => {
  // dispatch({ type: SET_LOADING, payload: true })
  await axios
    .get(`${projectsApi}/api/Request/Employee/${bu}`)
    .then((res) => {
      const requests = res.data.map((item) => ({
        ...item,
        Date_start: new Date(item.Date_start).toLocaleDateString("fr-CA"),
        Date_end: new Date(item.Date_end).toLocaleDateString("fr-CA"),
        lastestTime: new Date(item.lastestTime).toLocaleString("es-CL"),
        Status: handleStyleStatus(item.status),
      }));

      // dispatch({ type: SET_LOADING, payload: false })
      dispatch({ type: GET_SPEC_REQUEST_BY_BU, payload: requests });
    })
    .catch((err) => console.log("Get role error", err));
};
