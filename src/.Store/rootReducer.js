import { combineReducers } from 'redux'
import authReducer from './auth.reducer';
import lessonReducer from './lesson.reducer';

export default combineReducers({
    lesson: lessonReducer,
    auth: authReducer,
})