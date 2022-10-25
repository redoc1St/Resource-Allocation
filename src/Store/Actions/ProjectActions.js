// import axios from 'axios'
import axios from "../../../src/api/request";

import { GET_PROJECTS, GET_PROJECTS_BY_NAME } from "../types";
const projectsApi = "https://localhost:5001/api";

export const getProjects = () => async (dispatch) => {
  // dispatch({ type: SET_LOADING, payload: true })

  await axios
    .get(projectsApi + "/project")
    .then((res) => {
      // console.log(res)
      const projects = res.data.map((project) => ({
        id: project.Project_id,
        code: project.Code,
        name: project.ProjectName,
        Unit: project.Department_name,
        Department_id: project.Depeartment_id,
        pe: project.Effort_planned,
        ae: project.Effort_actual,
        be: project.Effort_billable,
        sdp: new Date(project.Start_plan).toLocaleDateString("fr-CA"),
        sda: new Date(project.Start_actual).toLocaleDateString("fr-CA"),
        edp: new Date(project.End_plan).toLocaleDateString("fr-CA"),
        eda: new Date(project.End_actual).toLocaleDateString("fr-CA"),
      }));
      // dispatch({ type: SET_LOADING, payload: false })
      dispatch({ type: GET_PROJECTS, payload: projects });
    })
    .catch((err) => console.log("Get project api error", err));
};

export const getProjectsByName = (name) => async (dispatch) => {
  await axios
    .get(projectsApi + `/project/search/${name}`)
    .then((res) => {
      const projects = res.data.map((project) => ({
        id: project.Project_id,
        code: project.Code,
        name: project.ProjectName,
        Unit: project.Department_name,
        Unit: project.Department_name,

        Department_id: project.Depeartment_id,
        pe: project.Effort_planned,
        ae: project.Effort_actual,
        be: project.Effort_billable,
        sdp: new Date(project.Start_plan).toLocaleDateString("fr-CA"),
        sda: new Date(project.Start_actual).toLocaleDateString("fr-CA"),
        edp: new Date(project.End_plan).toLocaleDateString("fr-CA"),
        eda: new Date(project.End_actual).toLocaleDateString("fr-CA"),
      }));
      dispatch({ type: GET_PROJECTS_BY_NAME, payload: projects });
      //   console.log(projects);
    })
    .catch((err) => console.log("Get countries api error", err));
};