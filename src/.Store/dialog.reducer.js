import * as actions from './dialog.actions';

const initialState = {
    open: false,
	activeSegment: -1,
	title: "",
}

const reducer = (state = initialState,action) => {
	switch (action.type) {
		case actions.SET_OPEN:
			return {
				...state,
				open: action.payload
            }
		case actions.SET_ACTIVE_SEGMENT:
			return {
				...state,
				activeSegment: action.payload
			}
		default:
			return state;
	}
}

export default reducer;