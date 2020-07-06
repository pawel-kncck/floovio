// import NewParser from '../Utilities/TestNewParser';

import * as actions from './auth.actions';

const initialState = {
	isLogging: false,
	authUser: null,
    authUserId: null,
    authUserEmail: null,
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
		default:
			return state;
	}
}

export default reducer;