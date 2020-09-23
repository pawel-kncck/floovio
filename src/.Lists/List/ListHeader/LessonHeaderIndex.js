import React from 'react';
import { TableHead, TableRow, TableCell, makeStyles } from '@material-ui/core';
import ExpandListButton from './ExpandListButton';
import ListName from './ListName';
import NewItemButton from './NewItemButton';
import ListOptions from './ListOptions/ListOptionsIndex';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '40px',
        borderBottom: '1px solid #ccc',
        '& div': {
            padding: '6px 10px'
        }
    },
    name: {
        flexGrow: 1
    }
})

const ListHeader = (props) => {
    const classes = useStyles();

    return (
            <div className={classes.root}>
                <div><ExpandListButton onToggle={props.onCollapse} collapsed={props.collapsed} /></div>
                <div className={classes.name}><ListName name={props.listData.name} /></div>
                <div></div>
                { props.canUserEdit ? <div><NewItemButton listId={props.listId} listData={props.listData} courseId={props.courseId} user={props.user} /></div> : null }
                { props.canUserEdit ? <div><ListOptions listId={props.listId} listData={props.listData} courseId={props.courseId} /></div> : null }
            </div>
    );
}
 
export default ListHeader;