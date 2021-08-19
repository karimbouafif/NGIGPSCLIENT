/* Login Reducer
 * handles login states in the app
 */
import createReducer from '../../lib/createReducer';
import * as types from '../../Store/actions/types';
import {
    ADD_RECLAMATION,
    ARCHIVE_RECLAMATION,
    DELETE_RECLAMATION,
    EDIT_RECLAMATION, GET_RECLAMATION, GET_RECLAMATIONS, IS_MODIFIED_RECLAMATION, RECLAMATION_LOADING,
    UNARCHIVE_RECLAMATION,
} from '../actions/types';


const initialState = {
    reclamations: [],
    reclamation: {},
    loading: false,
    search: [],
    searching: false,
    isModified:false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case RECLAMATION_LOADING:
            return {
                ...state,
                loading: true
            };
        case IS_MODIFIED_RECLAMATION:
            return {
                ...state,
                isModified:false
            };
        case GET_RECLAMATIONS:
            return {
                ...state,
                reclamations: action.payload,
                loading: false
            };
        case GET_RECLAMATION:
            return {
                ...state,
                reclamation: action.payload,
                loading: false
            };
        case ADD_RECLAMATION:
            return {
                ...state,
                reclamations: [...state.reclamations,action.payload],
                reclamation: action.payload
            };
        case EDIT_RECLAMATION:
            return {
                ...state,
                isModified:true,
                reclamations: state.reclamations.map((reclamation) => reclamation._id === action.payload._id ? reclamation = action.payload : reclamation)
            };
        case DELETE_RECLAMATION:
            return {
                ...state,
                reclamations: state.reclamations.filter(reclamation => reclamation._id !== action.payload),
            };
        case UNARCHIVE_RECLAMATION:
            return {
                ...state,
                reclamations: state.reclamations.map((reclamation) => reclamation._id === action.payload._id ? reclamation = action.payload : reclamation)
            };
        case ARCHIVE_RECLAMATION:
            return {
                ...state,
                reclamations: state.reclamations.map((reclamation) => reclamation._id === action.payload._id ? reclamation = action.payload : reclamation)
            };

        default:
            return state;
    }
}

