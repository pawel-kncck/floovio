import React from 'react';
import ImageDialog from './ImageUploader/ImageDialog';
import EditorDialog from './Editor/EditorDialog';
import { connect } from 'react-redux';


const SegmentDialog = (props) => {
    
    switch (props.segmentType) {
        case 'image': return <ImageDialog />
        case 'exercise': return <EditorDialog />
        default: return null
    }
}

const mapStateToProps = state => {
    return {
        data: state.lesson.lessonData,
        mode: state.lesson.lessonMode,
        open: state.dialog.open,
        activeSegment: state.dialog.activeSegment,
        segmentType: state.lesson.lessonData.segments[state.dialog.activeSegment].type, // image, exercise
    }
};
 
export default connect(mapStateToProps,null)(SegmentDialog);