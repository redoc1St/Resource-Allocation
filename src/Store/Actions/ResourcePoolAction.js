// import axios from 'axios'
import axios from "../../../src/api/request";

import { GET_RESOURCEPOOL_EMP, GET_RESOURCEPOOL_EMP_BY_BU, GET_RESOURCEPOOL_EMP_BY_NAME, GET_RESOURCEPOOL_EMP_BY_RLK } from "../types";
const projectsApi = process.env.REACT_APP_BASE_URL;
export const getResourcePoolEmp = () => async (dispatch) => {
  // dispatch({ type: SET_LOADING, payload: true })

  await axios
    .get(`${projectsApi}/api/ResourcePool`)
    .then((res) => {
      const emp = res.data.map((item) => ({
        ...item,
        Date_start: item.Date_start ? new Date(item.Date_start).toLocaleDateString("fr-CA") :'',
        Date_end: item.Date_end ? new Date(item.Date_end).toLocaleDateString("fr-CA"): '',
      }));
      // dispatch({ type: SET_LOADING, payload: false })
      dispatch({ type: GET_RESOURCEPOOL_EMP, payload: emp });
    })
    .catch((err) => console.log("Get role error", err));
};

export const getSearchResourcePoolEmpByName = (name) => async (dispatch) => {
  // dispatch({ type: SET_LOADING, payload: true })

  await axios
    .get(`${projectsApi}/api/ResourcePool/search/${name}`)
    .then((res) => {
      const emp = res.data.map((item) => ({
        ...item,
        Date_start: item.Date_start ? new Date(item.Date_start).toLocaleDateString("fr-CA") :'',
        Date_end: item.Date_end ? new Date(item.Date_end).toLocaleDateString("fr-CA"): '',
      }));
      // dispatch({ type: SET_LOADING, payload: false })
      dispatch({ type: GET_RESOURCEPOOL_EMP_BY_NAME, payload: emp });
    })
    .catch((err) => console.log("Get role error", err));
};

export const getResourcePoolEmpByRLK =
  (role, level, skill) => async (dispatch) => {
    // dispatch({ type: SET_LOADING, payload: true })

    await axios
      .get(`${projectsApi}/api/ResourcePool/${role}/${level}/${skill}`)
      .then((res) => {
        const emp = res.data.map((item) => ({
          ...item,
          Date_start: item.Date_start ? new Date(item.Date_start).toLocaleDateString("fr-CA") :'',
        Date_end: item.Date_end ? new Date(item.Date_end).toLocaleDateString("fr-CA"): '',
        }));
        // dispatch({ type: SET_LOADING, payload: false })
        dispatch({ type: GET_RESOURCEPOOL_EMP_BY_RLK, payload: emp });
        console.log(emp);
      })
      .catch((err) => console.log("Get role error", err));
  };

export const getResourcePoolEmpByBU = (bu) => async (dispatch) => {
  // dispatch({ type: SET_LOADING, payload: true })

  await axios
    .get(`${projectsApi}/api/ResourcePool/bu/${bu}`)
    .then((res) => {
      const emp = res.data.map((item) => ({
        ...item,
        Date_start: item.Date_start ? new Date(item.Date_start).toLocaleDateString("fr-CA") :'',
        Date_end: item.Date_end ? new Date(item.Date_end).toLocaleDateString("fr-CA"): '',
      }));
      // dispatch({ type: SET_LOADING, payload: false })
      dispatch({ type: GET_RESOURCEPOOL_EMP_BY_BU, payload: emp });
    })
    .catch((err) => console.log("Get role error", err));
};
