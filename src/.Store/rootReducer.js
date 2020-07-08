import { combineReducers } from 'redux'
import authReducer from './auth.reducer';
import lessonReducer from './lesson.reducer';
import dialogReducer from './dialog.reducer';

export default combineReducers({
    lesson: lessonReducer,
    auth: authReducer,
    // dialog: dialogReducer,
})