import { GET_ROLE_BY_CODE,GET_ROLES_BY_ROLE_CODE } from "../types";

const initialState = {
  roles: [],
  rolesEmp:[]
  //   project: null,
};

const PlanningRoleReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ROLE_BY_CODE:
      return { ...state, roles: payload };
    case GET_ROLES_BY_ROLE_CODE:
      return { ...state, rolesEmp: payload };

    default:
      return state;
  }
};
export default PlanningRoleReducer;
