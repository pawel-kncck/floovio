import { getCourse } from '../.Database/db.course';

/*
action types
*/

export const FETCH_COURSE_START = 'FETCH_COURSE_START';
export const FETCH_COURSE_SUCCESS = 'FETCH_COURSE_SUCCESS';
export const FETCH_COURSE_FAIL = 'FETCH_COURSE_FAIL';
export const SET_ACTIVE_STUDENT = 'SET_ACTIVE_STUDENT';

/*
action creators
*/

export const fetchCourseStart = () => {return { type: FETCH_COURSE_START }};

export const fetchCourseSuccess = (result, id) => {
    return {
        type: FETCH_COURSE_SUCCESS,
        data: {
            ...result,
            uid: id
        }
    }
}

export const fetchCourseFail = error => {
    return {
        type: FETCH_COURSE_FAIL,
        error: error
    }
}

export const setActiveStudent = userId => {
    return {
        type: SET_ACTIVE_STUDENT,
        userId: userId
    }
}

export const fetchCourse = (courseId) => {
    return dispatch => {
        dispatch(fetchCourseStart);
        return getCourse(courseId)
            .then(res => {
                dispatch(fetchCourseSuccess(res.data(), courseId));
                return res;
            })
            .catch(error => {
                dispatch(fetchCourseFail(error));
            })
    }
}