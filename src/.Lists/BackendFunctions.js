import firebase from '../.Database/firebase';
import { v4 as uuid } from 'uuid';

const db = firebase.firestore();
const coursesRef = db.collection('courses');

// ITEM CRUD

const createNewItem = (listId, courseId) => {
    // func
}

export const createNewLinkItem = (listId, courseId, user, name, url, type) => {
    const courseRef = coursesRef.doc(courseId);
    const id = uuid();
    const currentDate = new Date();
    const currentUser = user;

    const newLinkItemData = {
        id: id,
        name: name,
        type: type,
        format: '',
        source: '',
        url: url,
        createdAt: currentDate,
        createdBy: currentUser.uid
    }

    return courseRef.update({
                [`lists.${listId}.items.${id}`]: newLinkItemData
            })
            .then(() => {
                return `Item added to ${listId}`;
            })
            .catch(error => {
                throw error;
            })
}


export const createNewFileItem = (listIdFromInput, courseId, user, url, fileName, fileType, fileSize) => {
    const courseRef = coursesRef.doc(courseId);
    const id = uuid();
    const currentDate = new Date();
    const currentUser = user;
    const type = (fileType.split('/')[0] === 'image') ? 'image' : 'other';

    const newFileItemData = {
        id: id,
        name: fileName,
        type: type,
        format: fileType.split('/')[1] || '',
        source: '',
        url: url,
        size: fileSize,
        createdAt: currentDate,
        createdBy: currentUser.uid
    }

    return courseRef.update({
                [`lists.${listIdFromInput}.items.${id}`]: newFileItemData
            })
            .then(() => {
                return `File added to ${listIdFromInput}`;
            })
            .catch(error => {
                throw error;
            })
}

const getItem = (itemId, courseId) => {
    // func - better to use ids instead of list position, when more users are in the course
}

const updateItem = (itemId, courseId, itemData) => {
    // check if itemData is an object
    // use update to update or add only properites in itemData
    // eg. for change status itemData = { status: 'Completed' }
}

const moveItemsToBin = (itemId, listId, courseId) => {
    // func - better to use ids instead of list position, when more users are in the course,
    // move to systemLists.bin
    // save deletedAt and lastListId
}

export const deleteItem = (itemId, listId, courseId) => {
    const courseRef = coursesRef.doc(courseId);

    return courseRef.update({
        [`lists.${listId}.items.${itemId}`]: firebase.firestore.FieldValue.delete()
            })
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            })
}

// LIST CRUD

export const createNewList = (courseId, name, user) => {
    const courseRef = coursesRef.doc(courseId);
    const id = uuid();
    const currentDate = new Date();
    const currentUser = user;

    const newListData = {
        name: name,
        createdAt: currentDate,
        createdBy: currentUser.uid,
    }

    return courseRef.get()
        .then(() => {
            courseRef.update({
                [`lists.${id}`]: newListData
            });
        })
        .catch(err => {
            throw err;
        })
}

const getList = (listId, courseId) => {
    // func - better to use ids instead of list position, when more users are in the course
}

const updateListAttributes = (listId, courseId, listData) => {
    // check if listData is an object
    // prevent updating items[]
    // use update to update or add only properites in itemData (eg. name, status)
}

export const deleteList = (listId, courseId) => {
    const courseRef = coursesRef.doc(courseId);

    return courseRef.update({
        [`lists.${listId}`]: firebase.firestore.FieldValue.delete()
            })
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            })
}

// DUPLICATION

const duplicateItem = (itemId, sourceListId, sourceCourseId, taregtListId, targetCourseId) => {
    // id listIf === null add to unassigned
    // if sourceListId === targetListId add (1) to name, or increment - use another function for it
    // use courseId for "duplicate to another course"
    // push to array, add it to the end
    // return new id
}

const duplicateList = (listId, sourceCourseId, taregtListId, targetCourseId) => {
    // use targetCourseId for "duplicate to another course"
    // if sourceCourseId === targetCourseId add (1) to name, or increment - use another function for it
    // create new listId
    // craete new itemIDs
    // return new id
}

// CHANGE POSITIONS

const moveItemToAnotherList = (itemId, targetListId, courseId) => {
    // remove item from it's list
    // push it to the new list, to the end
}

const moveItemUp = (itemId, courseId) => {
    // if item index = 0, don't do anything
    // change positions
    // use changePositionInArray function -- create new function
}

const moveItemDown = (itemId, courseId) => {
    // if item index = length - 1, don't do anything
    // change positions
    // use changePositionInArray function -- create new function
}

const moveListUp = (listId, courseId) => {
    // if item index = 0, don't do anything
    // change positions
    // use changePositionInArray function -- create new function
}

const moveListDown = (listId, courseId) => {
    // if item index = length - 1, don't do anything
    // change positions
    // use changePositionInArray function -- create new function
}

