// import NewParser from '../Utilities/TestNewParser';

import * as actions from './auth.actions';

const initialState = {
    isLogging: false,
    isFetching: false,
    userUid: "",
    userData: {
        email: "",
        displayName: "",
        profilePic: "",
        studyingCourses: [],
        teachingCourses: [],
        roles: [],
        globalRoles: {
            student: true,
            teacher: false,
            editor: false,
            admin: false,
        }
    },
    error: null,
}

const reducer = (state = initialState,action) => {
	switch (action.type) {
		case actions.LOGIN_START:
			return {
				...state,
				isLogging: true
			}
        case actions.LOGIN_SUCCESS:
            return {
                ...state,
                isLogging: false
            }
        case actions.LOGIN_FAIL:
            return {
                ...state,
                isLogging: false,
                error: action.error
            }
        case actions.SET_USER:
            return {
                ...state,
                authUser: action.user,
                authUserId: action.id,
                authUserEmail: action.email,
            }
        case actions.FETCH_USER_START:
            return {
                ...state,
                isFetching: true
            }
        case actions.FETCH_USER_SUCCESS:
            return {
                ...state,
                userData: action.data,
                userUid: action.uid,
                isFetching: false
            }
        case actions.FETCH_USER_FAIL:
            return {
                ...state,
                error: action.error,
                isFetching: false
            }
        case actions.CLEAN_AUTH_STATE:
            return {
                ...state,
                userData: null,
                userUid: null,
                isFetching: false
            }
        case actions.LOGOUT_SUCCESS:
            return {
                ...state,
                userData: null,
                userUid: null,
                isFetching: false
            }
        case actions.CLEAR_ERROR:
            return {
                ...state,
                error: null,
            }
		default:
			return state;
	}
}

export default reducer;