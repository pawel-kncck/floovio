// import { 
// 	SET_TITLE, SET_AUTHOR, ADD_USER_TO_LESSON,ADD_EXERCISE,UPDATE_EXERCISE,
// } from './newLessonActions';

// const initialState = {
//     title: "",
//     author: "",
//     users: {},
//     json: {
//         node: 'element',
//         tag: 'div',
//         child: []
//     },
//     htmlStrings: []
// }

// const reducer = (state = initialState,action) => {
// 	switch (action.type) {
// 		case SET_TITLE:
// 			return {
// 				...state,
// 				title: action.payload,
// 			}
//         case SET_AUTHOR:
//             return {
//                 ...state,
//                 author: action.payload,
//             }
//         case ADD_USER_TO_LESSON:
//             return {
//                 ...state,
//                 users: {
//                     ...state.users,
//                     [action.payload]: {}
//                 },
//             }
//         case ADD_EXERCISE:
//             let newExerciseArray = [...state.json.child];
//             newExerciseArray.push(action.payload.json);
//             let newHtmlStringsArray = [...state.htmlStrings]
//             newHtmlStringsArray.push({__html: action.payload.html})
//             return {
//                 ...state,
//                 htmlStrings: newHtmlStringsArray,
//                 json: {
//                     ...state.json,
//                     child: newExerciseArray
//                 },
//             }
//         case UPDATE_EXERCISE:
//             let updatedExerciseArray = [...state.json.child];
//             updatedExerciseArray[action.payload.index] = (action.payload.json);
//             let updatedHtmlStringsArray = [...state.htmlStrings]
//             updatedHtmlStringsArray[action.payload.index] = ({__html: action.payload.html})
//             return {
//                 ...state,
//                 htmlStrings: updatedHtmlStringsArray,
//                 json: {
//                     ...state.json,
//                     child: updatedExerciseArray
//                 },
//             }
// 		default:
// 			return state;
// 	}
// }

// export default reducer;