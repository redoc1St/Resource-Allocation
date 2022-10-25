// import axios from 'axios'
import axios from '../../../src/api/request';

import {GET_RESOURCEPOOL_EMP,GET_RESOURCEPOOL_EMP_BY_RLK } from '../types'
const projectsApi= 'https://localhost:5001/api';
export const getResourcePoolEmp = () => async dispatch => {
    // dispatch({ type: SET_LOADING, payload: true })

    await axios.get(`${projectsApi}/ResourcePool`)
        .then(res => {
            const emp = res.data.map((item)=>({
                ...item,
                Date_start:new Date(item.Date_start).toLocaleDateString('fr-CA'),
                Date_end:new Date(item.Date_end).toLocaleDateString('fr-CA'),
            }))
            // dispatch({ type: SET_LOADING, payload: false })
            dispatch({ type: GET_RESOURCEPOOL_EMP, payload: emp})
        })
        .catch((err) => console.log('Get role error', err))
}

export const getResourcePoolEmpByRLK = (role,level,skill) => async dispatch => {
    // dispatch({ type: SET_LOADING, payload: true })

    await axios.get(`${projectsApi}/ResourcePool/${role}/${level}/${skill}`)
        .then(res => {
            const emp = res.data.map((item)=>({
                ...item,
                Date_start:new Date(item.Date_start).toLocaleDateString('fr-CA'),
                Date_end:new Date(item.Date_end).toLocaleDateString('fr-CA'),
            }))
            // dispatch({ type: SET_LOADING, payload: false })
            dispatch({ type: GET_RESOURCEPOOL_EMP_BY_RLK, payload: emp})
            console.log(emp);
        })
        .catch((err) => console.log('Get role error', err))
}
