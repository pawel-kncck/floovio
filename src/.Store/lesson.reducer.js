import * as actionTypes from './lesson.actions';
import { deepCopyFunction, createNestedObject } from '../.Utilities/helpers';

const initialState = {
    lessonId: "",
    lessonData: {
        title: "",
        author: "",
        lessonDate: 1112470620000,
        userInput: {},
        elements: [],
        json: {
            node: 'element',
            tag: 'div',
            child: []
        },
        htmlStrings: []
    },
    lessonMode: "",
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
		case actionTypes.SET_TITLE:
			return {
				...state,
				lessonData: {
                    ...state.lessonData,
                    title: action.payload,
                }
            }
        case actionTypes.RESET_LESSON_DATA:
            return {
                ...state,
                lessonData: initialState.lessonData
            }
        case actionTypes.SET_LESSON_DATE:
            return {
                ...state,
                lessonData: {
                    ...state.lessonData,
                    lessonDate: action.payload,
                }
            }
        case actionTypes.SET_AUTHOR:
            return {
                ...state,
                lessonData: {
                    ...state.lessonData,
                    author: action.payload,
                }
                
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
        case actionTypes.KILL_SPINNER:
            return {
                ...state,
                isFetching: false
            }
        case actionTypes.SET_ANSWER_IN_STATE:
            const initState = deepCopyFunction(state)
            return createNestedObject(initState, action.keys, action.value)

        case actionTypes.ADD_EXERCISE:
            let newExerciseArray = [...state.lessonData.json.child];
            newExerciseArray.push(action.payload.json);
            let newHtmlStringsArray = [...state.lessonData.htmlStrings]
            newHtmlStringsArray.push({__html: action.payload.html})
            return {
                ...state,
                lessonData: {
                    ...state.lessonData,
                    htmlStrings: newHtmlStringsArray,
                    json: {
                        ...state.lessonData.json,
                        child: newExerciseArray
                    },
                }
            }
        case actionTypes.ADD_IMAGE:
            let appendedExerciseArray = [...state.lessonData.json.child];
            appendedExerciseArray.push(action.payload);
            let appendedHtmlStringsArray = [...state.lessonData.htmlStrings]
            appendedHtmlStringsArray.push({__html: ""})
            return {
                ...state,
                lessonData: {
                    ...state.lessonData,
                    elements: {
                        type: 'image',
                        json: appendedExerciseArray,
                        htmlString: appendedHtmlStringsArray
                    },
                    htmlStrings: appendedHtmlStringsArray,
                    json: {
                        ...state.lessonData.json,
                        child: appendedExerciseArray
                    },
                }
            }

        case actionTypes.ADD_ELEMENT:
            let updatedElementArray = [...state.lessonData.elements];
            updatedElementArray.push(action.element);
            // let appendedHtmlStringsArray = [...state.lessonData.htmlStrings]
            // appendedHtmlStringsArray.push({__html: ""})
            return {
                ...state,
                lessonData: {
                    ...state.lessonData,
                    elements: updatedElementArray
                }
            }
        case actionTypes.UPDATE_EXERCISE:
            let updatedExerciseArray = [...state.lessonData.json.child];
            updatedExerciseArray[action.payload.index] = (action.payload.json);
            let updatedHtmlStringsArray = [...state.lessonData.htmlStrings]
            updatedHtmlStringsArray[action.payload.index] = ({__html: action.payload.html})
            return {
                ...state,
                lessonData: {
                    ...state.lessonData,
                    htmlStrings: updatedHtmlStringsArray,
                    json: {
                        ...state.json,
                        child: updatedExerciseArray
                    },
                }
            }
        case actionTypes.DELETE_EXERCISE:
            let trimmedExerciseArray = [...state.lessonData.json.child];
            trimmedExerciseArray.splice(action.payload.index,1)
            let trimmedHtmlStringsArray = [...state.lessonData.htmlStrings]
            trimmedHtmlStringsArray.splice(action.payload.index,1)
            return {
                ...state,
                lessonData: {
                    ...state.lessonData,
                    htmlStrings: trimmedHtmlStringsArray,
                    json: {
                        ...state.json,
                        child: trimmedExerciseArray
                    },
                }
            }
		default:
			return state;
	}
}

export default reducer;