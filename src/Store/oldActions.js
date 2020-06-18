/*
* action types
*/ 

export const OPEN_BUILDER = 'OPEN_BUILDER'
export const CLOSE_BUILDER = 'CLOSE_BUILDER'
export const NE_TITLE_UPDATE = 'NE_TITLE_UPDATE'
export const NE_RAWHTML_UPDATE = 'NE_RAWHTML_UPDATE'
export const NE_TAGS_UPDATE = 'NE_TAGS_UPDATE'
export const LOAD_EXERCISE_TO_STATE = 'LOAD_EXERCISE_TO_STATE'
export const CLEAN_EXERCISE_STATE = 'CLEAN_EXERCISE_STATE'
export const LOAD_ACTIVE_EXERCISE_TO_STATE = 'LOAD_ACTIVE_EXERCISE_TO_STATE'
export const SET_ANSWER_IN_STATE = 'SET_ANSWER_IN_STATE'
export const SET_LESSON_ANSWER_IN_STATE = 'SET_LESSON_ANSWER_IN_STATE'
export const SET_ACTIVE_LESSON_DATA = 'SET_ACTIVE_LESSON_DATA'
export const SET_USER = 'SET_USER'
export const SET_MODE = 'SET_MODE'
export const SET_SCORE_IN_STATE = 'SET_SCORE_IN_STATE'
export const SET_COMMENT_IN_STATE = 'SET_COMMENT_IN_STATE'
export const UPDATE_NEW_LESSON_TITLE = 'UPDATE_NEW_LESSON_TITLE'
export const TOGGLE_TEACHER_MODE = 'TOGGLE_TEACHER_MODE'

/*
 * action creators
 */

export function openBuilder() {
  return { type: OPEN_BUILDER }
}
  
export function closeBuilder() {
  return { type: CLOSE_BUILDER }
}

export function neUpdateTitle(title) {
  return { type: NE_TITLE_UPDATE, title }
}

export function neUpdateRawHtml(rawHtml) {
  return { type: NE_RAWHTML_UPDATE, rawHtml }
}

export function neUpdateTags(tagsArray) {
  return { type: NE_TAGS_UPDATE, tagsArray }
}

export function loadExerciseToState(exercise, exerciseId) {
  return { type: LOAD_EXERCISE_TO_STATE, exercise: exercise, exerciseId: exerciseId }
}

export function loadActiveExerciseToState(exercise, exerciseId) {
  return { type: LOAD_ACTIVE_EXERCISE_TO_STATE, exercise: exercise, exerciseId: exerciseId }
}

export function cleanExerciseState() {
  return { type: CLEAN_EXERCISE_STATE }
}

export function setAnswerInState(id,value) {
  return { type: SET_ANSWER_IN_STATE, fieldId: id, answer: value }
}

export function setLessonAnswerInState(id,value) {
  return { type: SET_LESSON_ANSWER_IN_STATE, id: id, answer: value }
}

export function setScoreInState(id,value) {
  return { type: SET_SCORE_IN_STATE, id: id, score: value }
}

export function setCommentInState(id,value) {
  return { type: SET_COMMENT_IN_STATE, id: id, comment: value }
}

export function setActiveLessonData(data) {
  return { type: SET_ACTIVE_LESSON_DATA, data: data}
}

export function setUser(user) {
  return { type: SET_USER, user: user}
}

export function setMode(user) {
  return { type: SET_MODE, user: user}
}

export function toggleTeacherMode() {
  return { type: TOGGLE_TEACHER_MODE }
}
