import { GET_BY_EMPLOYEE } from "../types";

const initialState = {
  emps: [],
};

const ReportReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_BY_EMPLOYEE:
      return { ...state, emps: payload };

    default:
      return state;
  }
};
export default ReportReducer;
