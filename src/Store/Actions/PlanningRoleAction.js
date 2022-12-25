// import axios from 'axios'
import axios from "../../../src/api/request";
import useAuth from "../../component/hooks/useAuth";
import { Divider, Tag } from "antd";

import { GET_ROLE_BY_CODE, GET_ROLES_BY_ROLE_CODE } from "../types";
const projectsApi = process.env.REACT_APP_BASE_URL;

const handleStyleStatus = (status) => {
  if (status === "Approved") {
    // return 'Approved'
    return <Tag style={{width:'85px',textAlign:'center'}} color="#87d068">Approved</Tag>;
  } else if (status === "Waiting") {
    return <Tag style={{width:'85px',textAlign:'center'}} color="#62B0A8">Draft</Tag>;
  } else if (status === "In Progress") {
    return <Tag style={{width:'85px',textAlign:'center'}} color="#DEDA23">In Progress</Tag>;
  } else if (status === "Reject") {
    return <Tag style={{ width: "85px", textAlign: "center" }} color="red">
      Rejected
    </Tag>;
};}

export const getRoleByCode = (code) => async (dispatch) => {
  // dispatch({ type: SET_LOADING, payload: true })
  let totalPQuantity = 0;
  let totalAQuantity = 0;

  await axios
    .get(`${projectsApi}/api/ResourcePlanning/${code}`)
    .then((res) => {
      const roles = res.data.map((item) => ({
        ...item,
        Date_start: new Date(item.Date_start).toLocaleDateString("fr-CA"),
        Date_end: new Date(item.Date_end).toLocaleDateString("fr-CA"),
        totalPQuantity:item.Status=='Approved'? (totalPQuantity += item.Quantity) : totalPQuantity,
        totalAQuantity: (totalAQuantity += item.actual) ,
        Status: handleStyleStatus(item.Status),
      }));
      // dispatch({ type: SET_LOADING, payload: false })
      dispatch({ type: GET_ROLE_BY_CODE, payload: roles });
    })
    .catch((err) => console.log("Get role error", err));
};

export const getRolesByNameNRole = (name, role) => async (dispatch) => {
  // dispatch({ type: SET_LOADING, payload: true })
  ///ResourcePlanning/view/ProjectName1/tester

  await axios
    .get(`${projectsApi}/api/ResourcePlanning/view/${name}/${role}`)
    .then((res) => {
      const roles = res.data.map((item) => ({
        ...item,
        Date_start: new Date(item.Date_start).toLocaleDateString("es-CL"),
        Date_end: new Date(item.Date_end).toLocaleDateString("es-CL"),
      }));
      // dispatch({ type: SET_LOADING, payload: false })
      dispatch({ type: GET_ROLES_BY_ROLE_CODE, payload: roles });
    })
    .catch((err) => console.log("Get role error", err));
};
