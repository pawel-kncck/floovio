/*
* action types
*/ 

export const SET_OPEN = 'SET_OPEN'
export const SET_ACTIVE_SEGMENT = 'SET_ACTIVE_SEGMENT'


/*
 * action creators
 */

export const setOpen = (value) => {
    return { type: SET_OPEN, payload: value }
}

export const setActiveSegment = (value) => {
    return { type: SET_ACTIVE_SEGMENT, payload: value }
}
