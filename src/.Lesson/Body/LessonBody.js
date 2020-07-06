import React from 'react';
import Segments from './Segments';
import AddSegment from './AddSegment';
import EmptySegment from './EmptySegment';
import { connect } from 'react-redux';

const LessonBody = (props) => {

    return (
        <>
            {(segments.length !== 0) ? <Segments /> : <EmptySegment />}
            {(props.mode === 'edit' || props.mode === 'new') ? <AddSegment /> : null}
        </>
    );
}

const mapStateToProps = state => {
    return {
        segments: state.lesson.lessonMode.segments,
        mode: state.lesson.lessonMode,
    }
};

export default connect(mapStateToProps,null)(LessonBody);