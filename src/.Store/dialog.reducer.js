// import * as actions from './dialog.actions';

// const initialState = {
// 	open: false,
// 	type: "",
// 	index: 0,
// 	html: "",
// 	json: {}
// }

// const reducer = (state = initialState,action) => {
// 	switch (action.type) {
// 		case actions.SET_OPEN:
// 			return {
// 				...state,
// 				open: action.payload.open,
// 				type: action.payload.segmentType
//             }
// 		case actions.SET_ACTIVE_SEGMENT:
// 			return {
// 				...state,
// 				index: action.payload
// 			}
// 		case actions.SET_ACTIVE_SEGMENT_TYPE:
// 			return {
// 				...state,
// 				type: action.payload
// 			}
// 		case actions.SET_DIALOG:
// 			return {
// 				...state,
// 				open: action.payload.open,
// 				type: action.payload.type,
// 				index: action.payload.index,
// 				html: action.payload.html,
// 				json: action.payload.json
// 			}
// 		default:
// 			return state;
// 	}
// }

// export default reducer;