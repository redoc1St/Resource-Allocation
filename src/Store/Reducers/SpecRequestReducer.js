import { GET_SPEC_REQUEST, GET_SPEC_REQUEST_BY_BU } from "../types";
const initialState = {
  specRequests: [],
  // specRequestsByBU: [],

  //   project: null,
};

const SpecRequestReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_SPEC_REQUEST:
      return { ...state, specRequests: payload };
      case GET_SPEC_REQUEST_BY_BU:
        return { ...state, specRequests: payload };
  
    // case GET_PROJECT_BY_ID:
    //   return { ...state, project: payload };
    default:
      return state;
  }
};
export default SpecRequestReducer;
