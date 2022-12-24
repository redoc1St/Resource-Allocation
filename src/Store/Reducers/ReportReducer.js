import { GET_BY_EMPLOYEE, GET_EMPS_BY_PNAME } from "../types";

const initialState = {
  emps: [],
  allEmpsByPName: [],
};

const ReportReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_BY_EMPLOYEE:
      return { ...state, emps: payload };
    case GET_EMPS_BY_PNAME:
      return { ...state, allEmpsByPName: payload };

    default:
      return state;
  }
};
export default ReportReducer;
