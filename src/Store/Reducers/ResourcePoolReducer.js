import { GET_RESOURCEPOOL_EMP, GET_RESOURCEPOOL_EMP_BY_BU, GET_RESOURCEPOOL_EMP_BY_NAME, GET_RESOURCEPOOL_EMP_BY_RLK } from "../types";
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

    case GET_RESOURCEPOOL_EMP_BY_BU:
      return { ...state, emps: payload };

    case GET_RESOURCEPOOL_EMP_BY_NAME:
      return { ...state, emps: payload };
    default:
      return state;
  }
};
export default ResourcePoolReducer;
