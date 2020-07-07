import React from 'react';
import { connect } from 'react-redux';
import { convertEpoch, convertDateStringToEpoch } from '../../.Utilities/helpers';
import { TextField } from '@material-ui/core';

const LessonDate = (props) => {
    return (
        <div>
            {
            ((props.mode === 'new') || (props.mode === 'edit'))
                ? <form noValidate>
                    <TextField
                        id="date"
                        label="Lesson date"
                        type="date"
                        defaultValue={convertEpoch(props.data.lessonDate).substr(0,10)}
                        onChange={(e) => props.setLessonDate(convertDateStringToEpoch(e.target.value))}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    </form>
                : null
            }
        </div>
    );
}

const mapStateToProps = state => {
    return {
        data: state.lesson.lessonData,
        mode: state.lesson.lessonMode,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setLessonDate: (epoch) => {dispatch(setLessonDate(epoch))},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LessonDate);