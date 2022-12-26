import {
  GET_CANDIDATES,
  GET_CANDIDATES_BY_NAME,
  GET_CANDIDATES_BY_NAMEANDSTATUS,
  GET_CANDIDATES_BY_STATUS,
  GET_EMP_PM_BY_ID,
} from "../types";
const initialState = {
  users: [],
  listPM:[]
  //   project: null,
};

const UsersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CANDIDATES:
      return { ...state, users: payload };

    case GET_CANDIDATES_BY_NAME:
      return { ...state, users: payload };
    case GET_CANDIDATES_BY_NAMEANDSTATUS:
      return { ...state, users: payload };
    case GET_CANDIDATES_BY_STATUS:
      return { ...state, users: payload };
      case GET_EMP_PM_BY_ID:
      return { ...state, listPM: payload };
      
    default:
      return state;

  }
};
export default UsersReducer;
