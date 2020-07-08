import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { openImageUploader, openEditor, setDialog } from '../../.Store/lesson.actions';

import ExerciseIcon from '@material-ui/icons/TocOutlined';
import VideoIcon from '@material-ui/icons/OndemandVideoOutlined';
import TextIcon from '@material-ui/icons/TextFieldsOutlined';
import ImageIcon from '@material-ui/icons/ImageOutlined';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SegmentDialog from '../Dialog/SegmentDialog';


const useStyles = makeStyles({
    root: {
        margin: '20px 0',
    }
})

const actions = [
    { icon: <ExerciseIcon />, name: 'exercise', type: 'exercise' },
    // { icon: <TextIcon />, name: 'Text' },
    { icon: <ImageIcon />, name: 'image', type: 'image'},
    // { icon: <VideoIcon />, name: 'Video' },
    // { icon: <FavoriteIcon />, name: 'Like' },
];

const AddSegment = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    
    const handleAddNew = (type) => {
        props.setDialog(true, type, -1, "", {})
    }

    return (
        <>
            <SpeedDial
                ariaLabel="SpeedDial example"
                className={classes.root}
                icon={<SpeedDialIcon />}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction='right'
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={() => handleAddNew(action.type)}
                    />
                ))}
            </SpeedDial>
        </>
    );
}

const mapStateToProps = state => {
    return {
        mode: state.lesson.lessonMode,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setDialog: (open,type,index,html,json) => {dispatch(setDialog(open,type,index,html,json))},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddSegment);