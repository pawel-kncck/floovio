import { combineReducers } from 'redux'
import authReducer from './auth.reducer';
import lessonReducer from './lesson.reducer';
import courseReducer from './course.reducer'
import dialogReducer from './dialog.reducer';

export default combineReducers({
    lesson: lessonReducer,
    course: courseReducer,
    auth: authReducer,
    // dialog: dialogReducer,
})