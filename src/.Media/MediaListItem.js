import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));
  

const MediaListItem = (props) => {
    const classes = useStyles();

    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={props.url} variant="square" />
            </ListItemAvatar>
            <ListItemText
            primary={props.name}
            secondary={
                <React.Fragment>
                <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                >
                    {props.code}
                </Typography>
                </React.Fragment>
            }
            />
        </ListItem>
    );
}
 
export default MediaListItem;