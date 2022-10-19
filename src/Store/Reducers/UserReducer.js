import { GET_CANDIDATES } from "../types";
const initialState = {
  users: [],
//   project: null,
};

const UsersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CANDIDATES:

      return { ...state, users: payload };
      
    // case GET_PROJECT_BY_ID:
    //   return { ...state, project: payload };
    default:
      return state;
  }
};
export default UsersReducer;
