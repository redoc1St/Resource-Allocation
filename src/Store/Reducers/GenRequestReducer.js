import { GET_GENERAL_REQUEST } from "../types";
const initialState = {
  genRequests: [],
  //   project: null,
};

const GenRequestReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_GENERAL_REQUEST:
      return { ...state, genRequests: payload };

    // case GET_PROJECT_BY_ID:
    //   return { ...state, project: payload };
    default:
      return state;
  }
};
export default GenRequestReducer;
