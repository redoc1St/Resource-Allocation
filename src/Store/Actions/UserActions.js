// import axios from 'axios'
import axios from '../../../src/api/request';

import { GET_CANDIDATES } from '../types'
const projectsApi= 'https://localhost:5001/api';

export const getUsers = () => async (dispatch) => {
    // dispatch({ type: SET_LOADING, payload: true })

    await axios.get(projectsApi + '/user')
        .then(res => {
            // console.log(res)
            const users = res.data.map((user) => ({
                    ...user,
                    BirthDay:new Date(user.BirthDay).toLocaleDateString('fr-CA')
            }))
            // dispatch({ type: SET_LOADING, payload: false })
            dispatch({ type: GET_CANDIDATES, payload: users })
        })
        .catch((err) => console.log('Get users api error', err))
}