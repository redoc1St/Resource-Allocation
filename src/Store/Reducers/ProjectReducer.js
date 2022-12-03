import { GET_PROJECTS, GET_PROJECTS_BY_NAME, GET_PROJECTS_BY_BU,GET_PROJECTS_IN_BU_BY_NAME } from "../types";

const initialState = {
  projects: [],
  project: null,
};

const ProjectsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PROJECTS:
      return { ...state, projects: payload };
    case GET_PROJECTS_BY_NAME:
      return { ...state, projects: payload };
    case GET_PROJECTS_BY_BU:
      return { ...state, projects: payload };
      case GET_PROJECTS_IN_BU_BY_NAME:
        return { ...state, projects: payload };
    default:
      return state;
  }
};
export default ProjectsReducer;
