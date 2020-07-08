import React from 'react';
import ImageDialog from './ImageUploader/ImageDialog';
import EditorDialog from './Editor/EditorDialog';
import { connect } from 'react-redux';


const SegmentDialog = (props) => {
    
    switch (props.type) {
        case 'image': return <ImageDialog />
        case 'exercise': return <EditorDialog />
        default: return null
    }
}

const mapStateToProps = state => {
    return {
        data: state.lesson.lessonData,
        mode: state.lesson.lessonMode,
        open: state.lesson.dialog.open,
        index: state.lesson.dialog.index,
        type: state.lesson.dialog.type,
        // segmentType: state.lesson.lessonData.segments[state.dialog.activeSegment].type, // image, exercise
    }
};
 
export default connect(mapStateToProps,null)(SegmentDialog);