import { GET_NOTI_BY_USERID } from "../types";
const initialState = {
  notiList: [],
  //   project: null,
};

const NotifiReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_NOTI_BY_USERID:
      return { ...state, notiList: payload };

    // case GET_PROJECT_BY_ID:
    //   return { ...state, project: payload };
    default:
      return state;
  }
};
export default NotifiReducer;
