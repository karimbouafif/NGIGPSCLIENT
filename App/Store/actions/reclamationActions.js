import {
    ADD_RECLAMATION, CLEAR_ERRORS,
    GET_ERRORS,
} from './types';


import axios from '../../config/api';
import jwt_decode from 'jwt-decode';


export const addReclamation = (eventData) => dispatch => {
    dispatch(clearErrors());
    axios.post("/reclamations/addReclamation", eventData)
        .then(res =>
            dispatch({
                type:  ADD_RECLAMATION,
                payload: res.data
            })
        )
        .catch(error => {
            if (error.response && error.response.data) {
                dispatch({
                    type: GET_ERRORS,
                    payload: {
                        message: error.response.data,
                        visible: true
                    }
                })
            }
        })
};

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};
