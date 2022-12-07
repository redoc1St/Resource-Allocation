import {
  GET_LEVELS,
  GET_ROLES,
  GET_SKILLS,
  GET_LEADER_BY_CODE,
  GET_PNAME_BY_RLS,
  GET_IDROLE_BY_CODERLS,
  GET_LEADER_BY_BU,
  GET_ALL_EMPS,
  GET_ALL_EMPS_BY_BU,
  GET_PNAME_FOR_LEADER_BY_RLS,
} from "../types";

const initialState = {
  levels: [],
  roles: [],
  skills: [],
  leader: null,
  pName: [],
  id: null,
  allEmps: [],
  allEmpsByBU: [],
  //   project: null,
};

const ExtraReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_LEVELS:
      return { ...state, levels: payload };
    case GET_ROLES:
      return { ...state, roles: payload };
    case GET_SKILLS:
      return { ...state, skills: payload };
    case GET_LEADER_BY_CODE:
      return { ...state, leader: payload };
    case GET_LEADER_BY_BU:
      return { ...state, leader: payload };
    case GET_PNAME_BY_RLS:
      return { ...state, pName: payload };
    case GET_IDROLE_BY_CODERLS:
      return { ...state, id: payload };
    case GET_ALL_EMPS:
      return { ...state, allEmps: payload };
    case GET_ALL_EMPS_BY_BU:
      return { ...state, allEmps: payload };
      
      case GET_PNAME_FOR_LEADER_BY_RLS:
        return { ...state, pName: payload };
    default:
      return state;
  }
};
export default ExtraReducer;
