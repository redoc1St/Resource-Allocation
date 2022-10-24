import { GET_LEVELS, GET_ROLES, GET_SKILLS } from "../types";

const initialState = {
  levels: [],
  roles: [],
  skills: [],
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
    default:
      return state;
  }
};
export default ExtraReducer;
