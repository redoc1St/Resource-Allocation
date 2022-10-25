import { GET_RESOURCEPOOL_EMP, GET_RESOURCEPOOL_EMP_BY_RLK } from "../types";
const initialState = {
  emps: [],
  //   project: null,
};

const ResourcePoolReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_RESOURCEPOOL_EMP:
      return { ...state, emps: payload };
    case GET_RESOURCEPOOL_EMP_BY_RLK:
      return { ...state, emps: payload };

    // case GET_PROJECT_BY_ID:
    //   return { ...state, project: payload };
    default:
      return state;
  }
};
export default ResourcePoolReducer;
