// import axios from 'axios'
import axios from "../../../src/api/request";

import {
  GET_LEADER_BY_CODE,
  GET_LEVELS,
  GET_ROLES,
  GET_SKILLS,
  GET_PNAME_BY_RLS,
  GET_IDROLE_BY_CODERLS,
  GET_LEADER_BY_BU,
  GET_ALL_EMPS,
  GET_ALL_EMPS_BY_BU
} from "../types";
const projectsApi = process.env.REACT_APP_BASE_URL;

export const getLevels = () => async (dispatch) => {
  // dispatch({ type: SET_LOADING, payload: true })

  await axios
    .get(projectsApi + "/api/levels")
    .then((res) => {
      // console.log(res)
      const levels = res.data.map((item) => ({
        ...item,
      }));
      // dispatch({ type: SET_LOADING, payload: false })
      dispatch({ type: GET_LEVELS, payload: levels });
    })
    .catch((err) => console.log("Get project api error", err));
};

export const getRoles = () => async (dispatch) => {
  // dispatch({ type: SET_LOADING, payload: true })

  await axios
    .get(projectsApi + "/api/roles")
    .then((res) => {
      // console.log(res)
      const roles = res.data.map((item) => ({
        ...item,
      }));
      // dispatch({ type: SET_LOADING, payload: false })
      dispatch({ type: GET_ROLES, payload: roles });
    })
    .catch((err) => console.log("Get project api error", err));
};

export const getSkills = () => async (dispatch) => {
  // dispatch({ type: SET_LOADING, payload: true })

  await axios
    .get(projectsApi + "/api/skills")
    .then((res) => {
      // console.log(res)
      const skills = res.data.map((item) => ({
        ...item,
      }));
      // dispatch({ type: SET_LOADING, payload: false })
      dispatch({ type: GET_SKILLS, payload: skills });
    })
    .catch((err) => console.log("Get project api error", err));
};

export const getLeaderByCode = (code) => async (dispatch) => {
  await axios
    .get(projectsApi + `/api/leader/${code}`)
    .then((res) => {
      const leader = res.data.map((item) => ({
        ...item,
      }));
      // dispatch({ type: SET_LOADING, payload: false })
      dispatch({ type: GET_LEADER_BY_CODE, payload: leader[0] });
    })
    .catch((err) => console.log("Get role error", err));
};
export const getLeaderByBU = (bu) => async (dispatch) => {
  await axios
    .get(projectsApi + `/api/leaderByBU/${bu}`)
    .then((res) => {
      const leader = res.data.map((item) => ({
        ...item,
      }));
      // dispatch({ type: SET_LOADING, payload: false })
      dispatch({ type: GET_LEADER_BY_BU, payload: leader[0] });
    })
    .catch((err) => console.log("Get role error", err));
};

export const getPNameByRLS = (role, level, skill) => async (dispatch) => {
  await axios
    .get(projectsApi + `/api/getPnameByRLS/${role}/${level}/${skill}`)
    .then((res) => {
      const projectName = res.data.map((item) => ({
        ...item,
      }));
      // dispatch({ type: SET_LOADING, payload: false })
      dispatch({ type: GET_PNAME_BY_RLS, payload: projectName });
    })
    .catch((err) => console.log("Get role error", err));
};

export const getIdRoleByCodeRLS =
  (code, role, level, skill) => async (dispatch) => {
    await axios
      .get(projectsApi + `/api/getPnameByRLS/${code}/${role}/${level}/${skill}`)
      .then((res) => {
        const id = res.data.map((item) => ({
          ...item,
        }));
        // dispatch({ type: SET_LOADING, payload: false })
        dispatch({ type: GET_IDROLE_BY_CODERLS, payload: id[0] });
      })
      .catch((err) => console.log("Get role error", err));
  };

  
export const getAllEmps = () => async (dispatch) => {
  // dispatch({ type: SET_LOADING, payload: true })

  await axios
    .get(projectsApi + "/api/user/employee")
    .then((res) => {
      // console.log(res)
      const emps = res.data.map((item) => ({
        ...item,
      }));
      // dispatch({ type: SET_LOADING, payload: false })
      dispatch({ type: GET_ALL_EMPS, payload: emps });
    })
    .catch((err) => console.log("Get project api error", err));
};

export const getAllEmpsByBU = (bu) => async (dispatch) => {
  // dispatch({ type: SET_LOADING, payload: true })

  await axios
    .get(projectsApi + `/api/user/${bu}`)
    .then((res) => {
      // console.log(res)
      const emps = res.data.map((item) => ({
        ...item,
      }));
      // dispatch({ type: SET_LOADING, payload: false })
      dispatch({ type: GET_ALL_EMPS_BY_BU, payload: emps });
    })
    .catch((err) => console.log("Get project api error", err));
};