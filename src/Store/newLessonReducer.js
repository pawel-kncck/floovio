import { 
	SET_TITLE, SET_AUTHOR, ADD_USER_TO_LESSON,ADD_EXERCISE,
} from './newLessonActions';

const initialState = {
    title: "",
    author: "",
    users: {},
    json: {
        node: 'element',
        tag: 'div',
        child: []
    }
}

const reducer = (state = initialState,action) => {
	switch (action.type) {
		case SET_TITLE:
			return {
				...state,
				title: action.payload,
			}
        case SET_AUTHOR:
            return {
                ...state,
                author: action.payload,
            }
        case ADD_USER_TO_LESSON:
            return {
                ...state,
                users: {
                    ...state.users,
                    [action.payload]: {}
                },
            }
        case ADD_EXERCISE:
            let newExerciseArray = [...state.json.child];
            newExerciseArray.push(action.payload);
            return {
                ...state,
                json: {
                    ...state.json,
                    child: newExerciseArray
                },
            }
		default:
			return state;
	}
}

export default reducer;