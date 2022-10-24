// import axios from 'axios'
import axios from "../../../src/api/request";

import { GET_LEVELS,GET_ROLES,GET_SKILLS } from "../types";
const projectsApi = "https://localhost:5001/api";

export const getLevels = () => async (dispatch) => {
  // dispatch({ type: SET_LOADING, payload: true })

  await axios
    .get(projectsApi + "/levels")
    .then((res) => {
      // console.log(res)
      const levels = res.data.map((item) => ({
        ...item
      }));
      // dispatch({ type: SET_LOADING, payload: false })
      dispatch({ type: GET_LEVELS, payload: levels });
    })
    .catch((err) => console.log("Get project api error", err));
};

export const getRoles = () => async (dispatch) => {
    // dispatch({ type: SET_LOADING, payload: true })
  
    await axios
      .get(projectsApi + "/roles")
      .then((res) => {
        // console.log(res)
        const roles = res.data.map((item) => ({
          ...item
        }));
        // dispatch({ type: SET_LOADING, payload: false })
        dispatch({ type: GET_ROLES, payload: roles });
      })
      .catch((err) => console.log("Get project api error", err));
  };
  
  export const getSkills = () => async (dispatch) => {
    // dispatch({ type: SET_LOADING, payload: true })
  
    await axios
      .get(projectsApi + "/skills")
      .then((res) => {
        // console.log(res)
        const skills = res.data.map((item) => ({
          ...item
        }));
        // dispatch({ type: SET_LOADING, payload: false })
        dispatch({ type: GET_SKILLS, payload: skills });
      })
      .catch((err) => console.log("Get project api error", err));
  };
  