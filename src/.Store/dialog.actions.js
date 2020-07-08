/*
* action types
*/ 

export const SET_OPEN = 'SET_OPEN'
export const SET_DIALOG = 'SET_DIALOG'
export const SET_ACTIVE_SEGMENT = 'SET_ACTIVE_SEGMENT'
export const SET_ACTIVE_SEGMENT_TYPE = 'SET_ACTIVE_SEGMENT_TYPE'


/*
 * action creators
 */

export const setDialog = (open,type,index,html,json) => {
    return { type: SET_DIALOG, payload: {
        open: open,
        type: type,
        index: index,
        html: html,
        json: json
    }}
}

export const openImageUploader = () => {
    return { type: SET_OPEN, payload: {
        open: true,
        segmentType: 'image'
    }}
}

export const openEditor = () => {
    return { type: SET_OPEN, payload: {
        open: true,
        segmentType: 'exercise'
    }}
}

export const setActiveSegment = (value) => {
    return { type: SET_ACTIVE_SEGMENT, payload: value }
}

export const setActiveSegmentType = (value) => {
    return { type: SET_ACTIVE_SEGMENT_TYPE, payload: value }
}
