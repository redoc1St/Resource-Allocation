// import axios from 'axios'
import axios from "../../../src/api/request";

import {
  GET_CANDIDATES,
  GET_CANDIDATES_BY_NAME,
  GET_CANDIDATES_BY_NAMEANDSTATUS,
  GET_CANDIDATES_BY_STATUS,
} from "../types";
const projectsApi = "https://localhost:5001/api";

export const getUsers = () => async (dispatch) => {
  // dispatch({ type: SET_LOADING, payload: true })

  await axios
    .get(projectsApi + "/user")
    .then((res) => {
      // console.log(res)
      const users = res.data.map((user) => ({
        ...user,
        BirthDay: new Date(user.BirthDay).toLocaleDateString("fr-CA"),
      }));
      // dispatch({ type: SET_LOADING, payload: false })
      dispatch({ type: GET_CANDIDATES, payload: users });
    })
    .catch((err) => console.log("Get users api error", err));
};

export const getUsersByName = (name) => async (dispatch) => {
  // dispatch({ type: SET_LOADING, payload: true })

  await axios
    .get(projectsApi + `/user/search/${name}`)
    .then((res) => {
      // console.log(res)
      const users = res.data.map((user) => ({
        ...user,
        BirthDay: new Date(user.BirthDay).toLocaleDateString("fr-CA"),
      }));
      // dispatch({ type: SET_LOADING, payload: false })
      dispatch({ type: GET_CANDIDATES_BY_NAME, payload: users });
      console.log(res);
    })
    .catch((err) => console.log("Get users api error", err));
};

export const getUsersByStatus = (status) => async (dispatch) => {
  // dispatch({ type: SET_LOADING, payload: true })

  await axios
    .get(projectsApi + `/user/list/${status}`)
    .then((res) => {
      // console.log(res)
      const users = res.data.map((user) => ({
        ...user,
        BirthDay: new Date(user.BirthDay).toLocaleDateString("fr-CA"),
      }));
      dispatch({ type: GET_CANDIDATES_BY_STATUS, payload: users });
    })
    .catch((err) => console.log("Get users api error", err));
};

export const getUsersByNameAStatus = (name, status) => async (dispatch) => {
  // dispatch({ type: SET_LOADING, payload: true })

  await axios
    .get(projectsApi + `/user/search/${name}/${status}`)
    .then((res) => {
      const users = res.data.map((user) => ({
        ...user,
        BirthDay: new Date(user.BirthDay).toLocaleDateString("fr-CA"),
      }));
      // dispatch({ type: SET_LOADING, payload: false })
      dispatch({ type: GET_CANDIDATES_BY_NAMEANDSTATUS, payload: users });
      console.log(res);
    })
    .catch((err) => console.log("Get users api error", err));
};
