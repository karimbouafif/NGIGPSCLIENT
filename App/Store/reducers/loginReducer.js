/* Login Reducer
 * handles login states in the app
 */
import createReducer from '../../lib/createReducer';
import * as types from '../../Store/actions/types';

import { ILoginState } from 'App/models/reducers/login';
import {
    ILoginRequestState,
    ILoginResponseState,
} from 'App/models/actions/login';
const initialState: ILoginState = {
    isLoggedIn: false,
    id: 0,
    email: '',
    password: '',
    user: {}
};

export const loginReducer = createReducer(initialState, {
    [types.LOGIN_REQUEST](state: ILoginState, action: ILoginRequestState) {
        return {
            ...state,
            email: action.email,
            password: action.password,
        };
    },
    [types.LOGIN_LOADING_ENDED](state: ILoginState) {
        return { ...state };
    },
    [types.LOGIN_RESPONSE](state: ILoginState, action: ILoginResponseState) {

        return {
            ...state,
            user: action.response.user,

            isLoggedIn: true,
        };
    },
    [types.LOGIN_FAILED](state: ILoginState) {
        return {
            ...state,
            isLoggedIn: false,
        };
    },
    [types.LOG_OUT](state: ILoginState) {
        return {
            ...state,
            isLoggedIn: false,
        };
    },
    [types.SET_CURRENT_USER](state:ILoginState,action: ILoginResponseState){

        return {

            ...state,
            user: action.response.user,
            isLoggedIn: true,

        }
    },

});
