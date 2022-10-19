import { GET_RESOURCEPOOL_EMP } from "../types";
const initialState = {
    emps: [],
//   project: null,
};

const ResourcePoolReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_RESOURCEPOOL_EMP:

      return { ...state, emps: payload };
      
    // case GET_PROJECT_BY_ID:
    //   return { ...state, project: payload };
    default:
      return state;
  }
};
export default ResourcePoolReducer;
