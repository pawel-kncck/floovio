import { v4 as uuid } from 'uuid';
import { getLesson } from '../.Database/db.lesson';

/*
action types
*/

export const LOAD_LESSON = 'LOAD_LESSON';
export const SET_MODE = 'SET_MODE';
export const FETCH_LESSON_START = 'FETCH_LESSON_START'
export const FETCH_LESSON_SUCCESS = 'FETCH_LESSON_SUCCESS'
export const FETCH_LESSON_FAIL = 'FETCH_LESSON_FAIL'
export const SET_ANSWER_IN_STATE = 'SET_ANSWER_IN_STATE'
export const SET_TITLE = 'SET_TITLE'
export const SET_LESSON_DATE = 'SET_LESSON_DATE'
export const SET_AUTHOR = 'SET_AUTHOR'
export const ADD_EXERCISE = 'ADD_EXERCISE'
export const ADD_HTML_STRING = 'ADD_HTML_STRING'
export const UPDATE_EXERCISE = 'UPDATE_EXERCISE'
export const DELETE_EXERCISE = 'DELETE_EXERCISE'
export const KILL_SPINNER = 'KILL_SPINNER'
export const ADD_IMAGE = 'ADD_IMAGE'
export const ADD_ELEMENT = 'ADD_ELEMENT'
export const RESET_LESSON_DATA = 'RESET_LESSON_DATA'

/*
action creators
*/

export const loadLesson = (data) => {
    return { 
        type: LOAD_LESSON,
        data: data
    }
};

export function setTitle(value) {
    return { type: SET_TITLE, payload: value }
}

export function setLessonDate(value) {
    return { type: SET_LESSON_DATE, payload: value }
}

export function setAuthor(value) {
    return { type: SET_AUTHOR, payload: value }
}


export function resetLessonData() {
    return { type: RESET_LESSON_DATA }
}

// export function addExercise(json,html) {
//     return { type: ADD_EXERCISE, payload: {html: html, json: json} }
// }

export function addExercise(json, html) {
    return { 
        type: ADD_ELEMENT, 
        element: {
            type: 'exercise',
            json: json,
            htmlString: html,
        }
    }
}

export function updateExercise(json,html,index) {
    return { type: UPDATE_EXERCISE, payload: {html: html, json: json, index: index} }
}

export function killSpinner() {
    return { type: KILL_SPINNER }
}

export function deleteExercise(index) {
    return { type: DELETE_EXERCISE, payload: {index: index} }
}

export function addImage(url) {
    return { 
        type: ADD_ELEMENT, 
        element: {
            type: 'image',
            json: {
                node: 'element',
                tag: 'img',
                attr: {
                    src: url,
                    alt: 'exercise illustration',
                    id: uuid(),
                }
            },
            htmlString: ""
        }
    }
}

export const fetchLessonStart = () => {return { type: FETCH_LESSON_START }};

export const fetchLessonSuccess = result => {
    return {
        type: FETCH_LESSON_SUCCESS,
        data: result
    }
}

export const fetchLessonFail = error => {
    return {
        type: FETCH_LESSON_FAIL,
        error: error
    }
}

export const fetchLesson = (mode,courseId,lessonId) => {
    return dispatch => {
        dispatch(fetchLessonStart);
        return getLesson(mode,courseId,lessonId)
            .then(res => {
                dispatch(fetchLessonSuccess(res.data()));
                return res;
            })
            .catch(error => {
                dispatch(fetchLessonFail(error));
            })
    }
}

export const setMode = (mode) => {
    return {
        type: SET_MODE,
        mode: mode
    }    
};

export const setAnswerInState = (keys,value) => {
    return {
        type: SET_ANSWER_IN_STATE,
        keys: keys,
        value: value
    }    
};