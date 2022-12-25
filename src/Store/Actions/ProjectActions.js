// import axios from 'axios'
import axios from "../../../src/api/request";

import {
  GET_PROJECTS,
  GET_PROJECTS_BY_NAME,
  GET_PROJECTS_BY_BU,
  GET_PROJECTS_IN_BU_BY_NAME,
  GET_PROJECTS_BY_EMP,
  GET_PROJECTS_IN_BU_BY_NAME_FOR_EMP,
} from "../types";
const projectsApi = process.env.REACT_APP_BASE_URL;

export const getProjects = () => async (dispatch) => {
  // dispatch({ type: SET_LOADING, payload: true })

  await axios
    .get(projectsApi + "/api/project")
    .then((res) => {
      // console.log(res)
      const projects = res.data.map((project) => ({
        ...project,
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
        note: project.note,
      }));
      // dispatch({ type: SET_LOADING, payload: false })
      dispatch({ type: GET_PROJECTS, payload: projects });
    })
    .catch((err) => console.log("Get project api error", err));
};

export const getProjectsByName = (name) => async (dispatch) => {
  await axios
    .get(projectsApi + `/api/project/search/${name}`)
    .then((res) => {
      const projects = res.data.map((project) => ({
        ...project,
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

export const getProjectsByEmp = (id) => async (dispatch) => {
  await axios
    .get(projectsApi + `/api/project/employee/${id}`)
    .then((res) => {
      const projects = res.data.map((project) => ({
        ...project,
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
      dispatch({ type: GET_PROJECTS_BY_EMP, payload: projects });
      //   console.log(projects);
    })
    .catch((err) => console.log("Get countries api error", err));
};

export const getProjectsByNameForEmp = (id,name) => async (dispatch) => {
  await axios
    .get(projectsApi + `/api/Project/employee/${id}/${name}`)
    .then((res) => {
      const projects = res.data.map((project) => ({
        ...project,
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
      dispatch({ type: GET_PROJECTS_IN_BU_BY_NAME_FOR_EMP, payload: projects });
      //   console.log(projects);
    })
    .catch((err) => console.log("Get countries api error", err));
};

export const getProjectsByBuId = (id) => async (dispatch) => {
  await axios
    .get(projectsApi + `/api/project/bu/${id}`)
    .then((res) => {
      const projects = res.data.map((project) => ({
        ...project,
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
      dispatch({ type: GET_PROJECTS_BY_BU, payload: projects });
      //   console.log(projects);
    })
    .catch((err) => console.log("Get countries api error", err));
};

export const getProjectsInBUByBuNameNId = (name, id) => async (dispatch) => {
  await axios
    .get(projectsApi + `/api/project/search/bu/${name}/${id}`)
    .then((res) => {
      const projects = res.data.map((project) => ({
        ...project,
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
      dispatch({ type: GET_PROJECTS_IN_BU_BY_NAME, payload: projects });
      //   console.log(projects);
    })
    .catch((err) => console.log("Get countries api error", err));
};
