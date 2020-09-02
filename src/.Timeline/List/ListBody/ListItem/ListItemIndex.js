import React from 'react';
import { TableRow, TableCell, makeStyles } from '@material-ui/core';
import OpenItemButton from './OpenItemButton';
import TypeIcon from './TypeIcon';
import ItemName from './ItemName';
import FormatTag from './FormatTag';
import StatusContainer from './StatusContainer';
import PositionButtons from './PositionButtons';
import ItemOptions from './ItemOptions';

const useStyles = makeStyles({
    root: {
        height: '30px',
    }
})

const ListItem = ({ itemData, courseId, index }) => {
    const classes = useStyles();

    return (
        <TableRow key={itemData.id} className={classes.root}>
            <TableCell><OpenItemButton itemData={itemData} /></TableCell>
            <TableCell><TypeIcon type={itemData.type} /></TableCell>
            <TableCell component='th' style={{ whiteSpace: 'nowrap' }}><ItemName name={itemData.name} /></TableCell>
            <TableCell>{(itemData.format) ? <FormatTag type={itemData.format} /> : null}</TableCell>
            <TableCell>{(itemData.status) ? <StatusContainer status={itemData.status} /> : null}</TableCell>
            <TableCell><PositionButtons index={index} /></TableCell>
            <TableCell><ItemOptions itemData={itemData} courseId={courseId} /></TableCell>
        </TableRow>
    );
}
 
export default ListItem;