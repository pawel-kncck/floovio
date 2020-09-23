import React from 'react';
import { Typography, makeStyles, Paper, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Close';
import DeletePrompt from './DeleteConfirmation';
import { deleteMediaObject } from '../.Database/BackendFunctions';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '150px',
      margin: '10px',
      padding: '5px',
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[3],
      '&:hover': {
          cursor: 'pointer',
          boxShadow: theme.shadows[7],
      },
      textAlign: 'center',
    },
    iconButton: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    imgContainer: {
        textAlign: 'center',
        overflow: 'hidden',
        height: '150px',
    },
    img: {
        objectFit: 'fill',
        height: '140px',
        width: '140px,'
    }
}));
  

const MediaCard = (props) => {
    const classes = useStyles();
    const [hover, setHover] = useState(false);
    const [deleteConfOpen, setDeleteConfOpen] = useState();

    const handleDelete = () => {
        deleteMediaObject(props.courseId, props.mediaObject);
        setDeleteConfOpen(false);
    }

    return (
        <>
        <Paper className={classes.root} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            {hover ? <IconButton size='small' className={classes.iconButton} onClick={() => setDeleteConfOpen(true)}><DeleteIcon /></IconButton> : null}
            <div className={classes.imgContainer}>
                <img className={classes.img} alt="thumbnail" src={props.url} />
            </div>
            <div>
                <Typography variant='body1' color='textPrimary' noWrap>{props.name}</Typography>
                <Typography variant='body2' color='textSecondary'>{props.code}</Typography>
            </div>
        </Paper>
        <DeletePrompt onDelete={handleDelete} onCancel={() => setDeleteConfOpen(false)} open={deleteConfOpen} />
        </>
    );
}
 
export default MediaCard;