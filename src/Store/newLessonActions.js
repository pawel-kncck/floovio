/*
* action types
*/ 

export const SET_TITLE = 'SET_TITLE'
export const SET_AUTHOR = 'SET_AUTHOR'
export const ADD_USER_TO_LESSON = 'ADD_USER_TO_LESSON'
export const ADD_EXERCISE = 'ADD_EXERCISE'

/*
 * action creators
 */

export function setTitle(value) {
  return { type: SET_TITLE, payload: value }
}

export function setAuthor(value) {
    return { type: SET_AUTHOR, payload: value }
}

export function addUser(value) {
    return { type: ADD_USER_TO_LESSON, payload: value }
}

export function addExercise(value) {
    return { type: ADD_EXERCISE, payload: value }
}

