import * as actionTypes from './lesson.actions';
import { deepCopyFunction, createNestedObject } from '../Application/HyphenLesson/helpers';

const initialState = {
    lessonId: "",
    lessonData: { json: { child: []} },
    lessonMode: undefined,
    lessonPath: "",
    isFetching: true,
    error: null
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOAD_LESSON:
			return {
                ...state,
                lessonData: action.data
            }
        case actionTypes.SET_MODE:
            return {
                ...state,
                lessonMode: action.mode
            }
        case actionTypes.FETCH_LESSON_START:
            return {
                ...state,
                isFetching: true
            }
        case actionTypes.FETCH_LESSON_SUCCESS:
            return {
                ...state,
                lessonData: action.data,
                isFetching: false
            }
        case actionTypes.FETCH_LESSON_FAIL:
            return {
                ...state,
                error: action.error,
                isFetching: false
            }
        case actionTypes.SET_ANSWER_IN_STATE:
            const initState = deepCopyFunction(state)
            return createNestedObject(initState, action.keys, action.value)
		default:
			return state;
	}
}

export default reducer;