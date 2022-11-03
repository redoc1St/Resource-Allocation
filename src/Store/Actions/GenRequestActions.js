// import axios from 'axios'
import axios from '../../../src/api/request';
import useAuth from '../../component/hooks/useAuth';

import {GET_GENERAL_REQUEST } from '../types'
const projectsApi= process.env.REACT_APP_BASE_URL;

export const getGeneralRequest = () => async dispatch => {
    // dispatch({ type: SET_LOADING, payload: true })
    await axios.get(`${projectsApi}/api/Request/RolePlanning`)
        .then(res => {
            const requests = res.data.map((item)=>({
                ...item,
                Date_start:new Date(item.Date_start).toLocaleDateString('fr-CA'),
                Date_end:new Date(item.Date_end).toLocaleDateString('fr-CA'),
                lastestTime:new Date(item.lastestTime).toLocaleString("es-CL")
            }))
            // dispatch({ type: SET_LOADING, payload: false })
            dispatch({ type: GET_GENERAL_REQUEST, payload: requests})
        })
        .catch((err) => console.log('Get role error', err))
}