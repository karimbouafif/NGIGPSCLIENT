
import {
    SET_CURRENT_USER,
    GET_ERRORS,
    CLEAR_ERRORS,
    LOGIN_REQUEST,
    LOG_OUT,
    LOGIN_DISABLE_LOADER,
    LOGIN_ENABLE_LOADER, LOGIN_RESPONSE, LOGIN_FAILED,
} from './types';
import AsyncStorage from '@react-native-community/async-storage';
import axios from '../../config/api';
import jwt_decode from 'jwt-decode';


export function requestLogin(email: string, password: string) {
    return {
        type: LOGIN_REQUEST,
        email,
        password,
    };
}
export const loginUser = userData => dispatch => {
    axios
        .post('/users/mobile/signin', userData)
        .then(res => {
            const { token } = res.data;
            AsyncStorage.setItem('token', token);
            console.log(token);
            const decoded = jwt_decode(token);
            dispatch(clearErrors());
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: {
                    message: err.response.data,
                    visible: true
                }
            })
        );
};

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};
// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};


export function loginFailed() {
    return {
        type: LOGIN_FAILED,
    };
}

export const onLoginResponse = decoded => {
    return {
        type: LOGIN_RESPONSE,
        user:decoded
    };
}

export function enableLoader() {
    return {
        type: LOGIN_ENABLE_LOADER,
    };
}

export function disableLoader() {
    return {
        type: LOGIN_DISABLE_LOADER,
    };
}

export function logOut() {
    return {
        type: LOG_OUT,
    };
}
