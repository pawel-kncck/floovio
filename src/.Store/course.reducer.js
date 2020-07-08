import * as actionTypes from './course.actions';

const initialState = {
    data: {},
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
                isFetching: false
            }
        case actionTypes.FETCH_COURSE_FAIL:
            return {
                ...state,
                error: action.error,
                isFetching: false
            }
		default:
			return state;
	}
}

export default reducer;