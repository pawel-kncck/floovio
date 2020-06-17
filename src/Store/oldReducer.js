// import NewParser from '../Utilities/TestNewParser';

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
	SET_LESSON_ANSWER_IN_STATE,
	SET_ACTIVE_LESSON_DATA,
	SET_SCORE_IN_STATE,
	SET_COMMENT_IN_STATE,
	SET_USER,
	UPDATE_NEW_LESSON_TITLE,
} from './oldActions';

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
	loggedUser: "testuser",
	activeLessonAnswers: {},
	activeLessonData: { users: {}},
	activeLessonId: "",
	checking_mode: true,
	activeId: "",
	answers: {},
	mode: "",
	newExercise: emptyExercise,
	activeExercise: emptyExercise,
	newLesson: {}
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
		case UPDATE_NEW_LESSON_TITLE:
			return {
				...state,
				newLesson: {
					...state.newLesson,
					title: action.title
				}
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
		case SET_USER:
			return {
				...state,
				loggedUser: action.user
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
		case SET_ACTIVE_LESSON_DATA:
			return {
				...state,
				activeLessonData: action.data
			}
		case SET_LESSON_ANSWER_IN_STATE:
			return {
				...state,
				activeLessonData: {
					...state.activeLessonData,
					users: {
						...state.activeLessonData.users,
						[state.loggedUser]: {
							...state.activeLessonData.users[state.loggedUser],
							[action.id]: {
								...state.activeLessonData.users[state.loggedUser][action.id],
								answer: action.answer
							}
						}
					}
				}
			}
			case SET_SCORE_IN_STATE:
				return {
					...state,
					activeLessonData: {
						...state.activeLessonData,
						users: {
							...state.activeLessonData.users,
							[state.loggedUser]: {
								...state.activeLessonData.users[state.loggedUser],
								[action.id]: {
									...state.activeLessonData.users[state.loggedUser][action.id],
									score: action.score
								}
							}
						}
					}
				}
			case SET_COMMENT_IN_STATE:
				return {
					...state,
					activeLessonData: {
						...state.activeLessonData,
						users: {
							...state.activeLessonData.users,
							[state.loggedUser]: {
								...state.activeLessonData.users[state.loggedUser],
								[action.id]: {
									...state.activeLessonData.users[state.loggedUser][action.id],
									comment: action.comment
								}
							}
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
					// transformedHtml: NewParser(action.rawHtml),
					// json: html2json(NewParser(action.rawHtml).__html),
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