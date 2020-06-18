import { combineReducers } from 'redux'
import oldReducer from './oldReducer'
import newLessonReducer from './newLessonReducer'

export default combineReducers({
    oldReducer,
    newLessonReducer
})