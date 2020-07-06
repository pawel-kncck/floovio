import React from 'react';
import ExerciseIcon from '@material-ui/icons/TocOutlined';
import VideoIcon from '@material-ui/icons/OndemandVideoOutlined';
import TextIcon from '@material-ui/icons/TextFieldsOutlined';
import ImageIcon from '@material-ui/icons/ImageOutlined';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

const actions = [
    { icon: <ExerciseIcon />, name: 'Exercise' },
    { icon: <TextIcon />, name: 'Text' },
    { icon: <ImageIcon />, name: 'Image' },
    { icon: <VideoIcon />, name: 'Video' },
    // { icon: <FavoriteIcon />, name: 'Like' },
];

const AddSegment = () => {
    
    const handleAddNew = (actionName) => {
        if (actionName === 'Image') {
            handleOpenImageUploaderInCreateMode();
        } else if (actionName === 'Exercise') {
            handleOpenEditorInCreateMode();
        }
    }

    return (
        <>
            <SpeedDial
                ariaLabel="SpeedDial example"
                // className={classes.speedDial}
                icon={<SpeedDialIcon />}
                // onClose={handleClose}
                // onOpen={handleOpen}
                open
                direction='right'
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={() => handleAddNew(action.name)}
                    />
                ))}
            </SpeedDial>
        </>
    );
}
 
export default AddSegment;