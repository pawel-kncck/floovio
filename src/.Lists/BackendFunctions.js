// ITEM CRUD

const createNewItem = (listId, courseId) => {
    // func
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

const deleteItem = (itemId, courseId) => {
    // func - better to use ids instead of list position, when more users are in the course
}

// LIST CRUD

const createNewList = (courseId) => {
    // check if lists: [] exists
    // if doesn't exist create new one
    // create id and name
    // push into lists[]
}

const getList = (listId, courseId) => {
    // func - better to use ids instead of list position, when more users are in the course
}

const updateListAttributes = (listId, courseId, listData) => {
    // check if listData is an object
    // prevent updating items[]
    // use update to update or add only properites in itemData (eg. name, status)
}

const deleteList = (listId, courseId, deleteAllItems) => {
    // deleteAllItems is boolean - if true, remove list with all references, if false - move items to unassignedItems[]
    // remove
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

