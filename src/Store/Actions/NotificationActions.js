// import axios from 'axios'
import axios from "../../../src/api/request";

import { GET_NOTI_BY_USERID } from "../types";
const projectsApi = process.env.REACT_APP_BASE_URL;

export const getNotiByUserId = (userId) => async (dispatch) => {
  // dispatch({ type: SET_LOADING, payload: true })

  await axios
    .get(projectsApi + `/api/notification/${userId}`)
    .then((res) => {
      console.log(res)
      const notiList = res.data.map((item) => ({
        ...item,
      }));
      // dispatch({ type: SET_LOADING, payload: false })
      dispatch({ type: GET_NOTI_BY_USERID, payload: notiList });
    })
    .catch((err) => console.log("Get project api error", err));
};
