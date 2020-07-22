import React from 'react';
import { makeStyles } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const useStyles = makeStyles({
    root: {
        display: "flex",
        padding: "10px 5px 10px 15px",
        height: "auto",
        alignItems: "center",
    },
    title: {
        flexGrow: 1,
        color: "#777",
    },
    wrapIcon :{
        color: "#777",
        '&:hover': {
            cursor: 'pointer',
            color: "#ccc"
        },
        transition: "color 0.2s",
        margin: 0,
        outline: "none",
        border: 0,
        backgroundColor: "rgba(0, 0, 0, 0)",
    }
})

const SidebarContainerHeader = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.title}>{props.title}</div>
            <button className={classes.wrapIcon} onClick={props.onWrap}>
                <ArrowBackIcon />
            </button>
            
        </div>
    );
}
 
export default SidebarContainerHeader;