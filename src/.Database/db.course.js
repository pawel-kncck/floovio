import firebase from './firebase';

export const getCourse = (courseId) => {
    const courseRef = firebase.firestore().collection("courses").doc(courseId);
    return courseRef.get()
}

export const updateMediaList = (courseId, currentMediaObject, fileId, name, url) => {
    const courseRef = firebase.firestore().collection("courses").doc(courseId);

    const updatedEntry = {
        ...currentMediaObject,
        [fileId]: {
            name: name,
            url: url
        }
    };

    courseRef.update({ media: updatedEntry })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.error(err);
        })
}