import * as actionTypes from './course.actions';

const initialState = {
    data: {},
    activeStudent: '',
    isFetching: false,
    error: null,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
        case actionTypes.FETCH_COURSE_START:
            return {
                ...state,
                isFetching: true
            }
        case actionTypes.FETCH_COURSE_SUCCESS:
            return {
                ...state,
                data: action.data,
                activeStudent: action.data.roles.students[0],
                isFetching: false
            }
        case actionTypes.FETCH_COURSE_FAIL:
            return {
                ...state,
                error: action.error,
                isFetching: false
            }
        case actionTypes.SET_ACTIVE_STUDENT:
            return {
                ...state,
                activeStudent: action.userId
            }
        case actionTypes.SET_ACTIVE_PATH:
            return {
                ...state,
                activePath: action.payload
            }
        case actionTypes.RESET_ACTIVE_PATH:
            return {
                ...state,
                activePath: ''
            }
		default:
			return state;
	}
}

export default reducer;