import { combineReducers } from 'redux'
import oldReducer from './oldReducer'
import newLessonReducer from './newLessonReducer'
import authReducer from './auth.reducer';
import lessonReducer from './lesson.reducer';


export default combineReducers({
    lesson: lessonReducer,
    auth: authReducer,
    oldReducer,
    newLessonReducer
})