import firebase from '../firebase';

const setLessonRef = (mode,courseId,lessonId) => {
    let lessonRef;
    if (courseId !== null) {
        lessonRef = firebase.firestore().collection("courses").doc(courseId).collection("lessons").doc(lessonId);
    } else {
        lessonRef = firebase.firestore().collection("lessons").doc(lessonId);
    }
    return lessonRef;
}

export const getLesson = (mode,courseId,lessonId) => {
    const lessonRef = setLessonRef(mode,courseId,lessonId);
    return lessonRef.get()
}

export const handleDbErrors = response => {
    if (response.error) {
      throw Error(response.error);
    }
    return response;
}