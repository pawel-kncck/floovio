import NewParser from '../Utilities/TestNewParser';

import { 
	OPEN_BUILDER,
	CLOSE_BUILDER,
	NE_TITLE_UPDATE,
	NE_RAWHTML_UPDATE,
	NE_TAGS_UPDATE,
	LOAD_EXERCISE_TO_STATE,
	LOAD_ACTIVE_EXERCISE_TO_STATE,
	CLEAN_EXERCISE_STATE,
	SET_ANSWER_IN_STATE, 
} from './actions';

import html2json from '../Utilities/html2json';

// const html2json = require('html2json').html2json;

const emptyExercise = {
	title: "",
	rawHtml: "",
	transformedHtml: "",
	json: "",
	tags: [],
	answers: {}
}

const initialState = {
	showBuilder: false,
	activeId: "",
	answers: {},
	mode: "",
	newExercise: emptyExercise,
	activeExercise: emptyExercise,
}

const reducer = (state = initialState,action) => {
	switch (action.type) {
		case OPEN_BUILDER:
			return {
				...state,
				showBuilder: true,
			}
		case CLOSE_BUILDER:
			return {
				...state,
				showBuilder: false,
			}
		case LOAD_EXERCISE_TO_STATE:
			return {
				...state,
				newExercise: action.exercise,
				activeId: action.exerciseId
			}
		case LOAD_ACTIVE_EXERCISE_TO_STATE:
			return {
				...state,
				activeExercise: action.exercise
			}
		case SET_ANSWER_IN_STATE:
			return {
				...state,
				activeExercise: {
					...state.activeExercise,
					answers: {
						...state.activeExercise.answer,
						[action.fieldId]: action.answer
					}
				}
			}
		case CLEAN_EXERCISE_STATE:
			return {
				...state,
				activeId: "",
				newExercise: {
					title: "",
					rawHtml: "",
					transformedHtml: "",
					json: "",
					tags: [],
					answers: {}
				}
			}
		case NE_TITLE_UPDATE:
			return {
				...state,
				newExercise: {
					...state.newExercise,
					title: action.title
				}
			}
		case NE_RAWHTML_UPDATE:
			return {
				...state,
				newExercise: {
					...state.newExercise,
					rawHtml: action.rawHtml,
					transformedHtml: NewParser(action.rawHtml),
					json: html2json(NewParser(action.rawHtml).__html),
				}
			}
		case NE_TAGS_UPDATE:
			return {
				...state,
				newExercise: {
					...state.newExercise,
					tags: action.tagsArray
				}
			}
		default:
			return state;
	}
}

export default reducer;