// import axios from 'axios'
import axios from '../../../src/api/request';
import useAuth from '../../component/hooks/useAuth';

import {GET_ROLE_BY_CODE,GET_ROLES_BY_ROLE_CODE, } from '../types'
const projectsApi= 'https://localhost:5001/api';

export const getRoleByCode = (code) => async dispatch => {
    // dispatch({ type: SET_LOADING, payload: true })
let  totalPQuantity=0
    await axios.get(`${projectsApi}/ResourcePlanning/${code}`)
        .then(res => {
            const roles = res.data.map((item)=>({
                ...item,
                Date_start:new Date(item.Date_start).toLocaleDateString('fr-CA'),
                Date_end:new Date(item.Date_end).toLocaleDateString('fr-CA'),
                totalPQuantity:totalPQuantity+=item.Quantity
            }))
            // dispatch({ type: SET_LOADING, payload: false })
            dispatch({ type: GET_ROLE_BY_CODE, payload: roles})
        })
        .catch((err) => console.log('Get role error', err))
}

export const getRolesByNameNRole = (name,role) => async dispatch => {
    // dispatch({ type: SET_LOADING, payload: true })
///ResourcePlanning/view/ProjectName1/tester

    await axios.get(`${projectsApi}/ResourcePlanning/view/${name}/${role}`)
        .then(res => {
            const roles = res.data.map((item)=>({
                ...item,
                Date_start:new Date(item.Date_start).toLocaleDateString('fr-CA'),
                Date_end:new Date(item.Date_end).toLocaleDateString('fr-CA'),
            }))
            // dispatch({ type: SET_LOADING, payload: false })
            dispatch({ type: GET_ROLES_BY_ROLE_CODE, payload: roles})        
        })
        .catch((err) => console.log('Get role error', err))
}