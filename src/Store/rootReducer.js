import { combineReducers } from 'redux'
import oldRerucer from './oldReducer'
import newLessonReducer from './newLessonReducer'

export default combineReducers({
    oldRerucer,
    newLessonReducer
})