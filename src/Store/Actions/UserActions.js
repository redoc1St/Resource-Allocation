// import axios from 'axios'
import axios from "../../../src/api/request";

import {
  GET_CANDIDATES,
  GET_CANDIDATES_BY_NAME,
  GET_CANDIDATES_BY_NAMEANDSTATUS,
  GET_CANDIDATES_BY_STATUS,
  GET_EMP_PM_BY_ID,
} from "../types";
const projectsApi = process.env.REACT_APP_BASE_URL;
export const getUsers = () => async (dispatch) => {

  await axios
    .get(projectsApi + "/api/user")
    .then((res) => {
      const users = res.data.map((user) => ({
        ...user,
        BirthDay: new Date(user.BirthDay).toLocaleDateString("fr-CA"),
      }));
      dispatch({ type: GET_CANDIDATES, payload: users });
    })
    .catch((err) => console.log("Get users api error", err));
};

export const getUsersByName = (name) => async (dispatch) => {

  await axios
    .get(projectsApi + `/api/user/search/${name}`)
    .then((res) => {
      const users = res.data.map((user) => ({
        ...user,
        BirthDay: new Date(user.BirthDay).toLocaleDateString("fr-CA"),
      }));
      // dispatch({ type: SET_LOADING, payload: false })
      dispatch({ type: GET_CANDIDATES_BY_NAME, payload: users });
      // console.log(res);
    })
    .catch((err) => console.log("Get users api error", err));
};

export const getUsersByStatus = (status) => async (dispatch) => {
  // dispatch({ type: SET_LOADING, payload: true })

  await axios
    .get(projectsApi + `/api/user/list/${status}`)
    .then((res) => {
      const users = res.data.map((user) => ({
        ...user,
        BirthDay: new Date(user.BirthDay).toLocaleDateString("fr-CA"),
      }));
      dispatch({ type: GET_CANDIDATES_BY_STATUS, payload: users });
    })
    .catch((err) => console.log("Get users api error", err));
};

export const getUsersByNameAStatus = (name, status) => async (dispatch) => {

  await axios
    .get(projectsApi + `/api/user/search/${name}/${status}`)
    .then((res) => {
      const users = res.data.map((user) => ({
        ...user,
        BirthDay: new Date(user.BirthDay).toLocaleDateString("fr-CA"),
      }));
      // dispatch({ type: SET_LOADING, payload: false })
      dispatch({ type: GET_CANDIDATES_BY_NAMEANDSTATUS, payload: users });
    })
    .catch((err) => console.log("Get users api error", err));
};

export const getPMById = (id) => async (dispatch) => {

  await axios
    .get(projectsApi + `/api/user/Employee/PM/${id}`)
    .then((res) => {
      const users = res.data.map((user) => ({
        ...user,
        BirthDay: new Date(user.BirthDay).toLocaleDateString("fr-CA"),
      }));
      // dispatch({ type: SET_LOADING, payload: false })
      dispatch({ type: GET_EMP_PM_BY_ID, payload: users });
      // console.log(res);
    })
    .catch((err) => console.log("Get users api error", err));
};