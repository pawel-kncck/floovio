import React, { Fragment } from 'react';

const LessonBody = (props) => {
    return (
        <Fragment>
            {props.data.elements.map((el,index) => {
            return (
                    <Paper key={index} elevation={0} className={(props.mode === 'edit') ? classes.exrcContainerEdit : classes.exrcContainer}>
                        <div className={classes.exrcContent}>
                            {renderer(el.json)}
                        </div>
                        {(props.mode === 'edit' || props.mode === 'new') 
                            ?   <div className={classes.editButtons}>
                                    <Button color="primary"><ArrowUpwardIcon /></Button>
                                    <Button color="primary"><ArrowDownwardIcon /></Button>
                                    <Button color="primary" onClick={() => handleOpenEditorInEditMode(index)}><EditIcon /></Button>
                                    <Button color="primary" onClick={() => props.deleteExercise(index)}><DeleteIcon /></Button>
                                </div>
                            :   null
                        }
                    </Paper>
                )
            })}

            {(props.exercises.length === 0) 
                ?   <Box className={classes.emptyState}>
                        <Typography variant='h1'>Start building a new lesson!</Typography><br></br>
                        <Typography variant='h6'>Click on the button below to add a first exercise</Typography>
                    </Box>
                : null
            }

            {(props.mode === 'edit' || props.mode === 'new')
                ?   <SpeedDial
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
                : null
            }
        </Fragment>
    );
}
 
export default LessonBody;