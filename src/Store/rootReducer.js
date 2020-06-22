import { combineReducers } from 'redux'
import oldReducer from './oldReducer'
import newLessonReducer from './newLessonReducer'
import authReducer from './auth.reducer';


export default combineReducers({
    auth: authReducer,
    oldReducer,
    newLessonReducer
})