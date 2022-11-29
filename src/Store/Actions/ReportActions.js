// import axios from 'axios'
import axios from "../../../src/api/request";

import {
GET_BY_EMPLOYEE
} from "../types";
const projectsApi = process.env.REACT_APP_BASE_URL;

export const getByEmp = (empId) => async (dispatch) => {
  // dispatch({ type: SET_LOADING, payload: true })

  await axios
    .get(projectsApi + `/api/report/employee`)
    .then((res) => {
      // console.log(res)
      const emps = res.data.map((item) => ({
        ...item,
        Date_start: new Date(item.Date_start).toLocaleDateString("fr-CA"),
        Date_end: new Date(item.Date_end).toLocaleDateString("fr-CA"),
      }));
      // dispatch({ type: SET_LOADING, payload: false })
      dispatch({ type: GET_BY_EMPLOYEE, payload: emps });
    })
    .catch((err) => console.log("Get project api error", err));
};
