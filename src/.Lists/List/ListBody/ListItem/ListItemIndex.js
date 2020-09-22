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
        '&:hover': {
            backgroundColor: '#fafafa',
        },
    },
    cell: {
        border: 'none',
        paddingTop: 0,
        paddingBottom: 0,
    }
})

const ListItem = ({ itemId, listId, courseId, itemData, canUserEdit }) => {
    const classes = useStyles();

    return (
        <TableRow key={itemData.id} className={classes.root}>
            <TableCell className={classes.cell}>
                <OpenItemButton itemData={itemData} />
            </TableCell>
            <TableCell className={classes.cell}>
                <TypeIcon type={itemData.type} />
            </TableCell>
            <TableCell component='th' style={{ whiteSpace: 'nowrap', width: '300px', maxWidth: '300px', overflow: 'hidden' }} className={classes.cell}>
                <ItemName name={itemData.name} />
            </TableCell>
            <TableCell className={classes.cell}>
                {/* {(itemData.format) ? <FormatTag type={itemData.format} /> : null} */}
            </TableCell>
            <TableCell className={classes.cell}>
                {/* {(itemData.status) ? <StatusContainer status={itemData.status} /> : null} */}
            </TableCell>
            <TableCell className={classes.cell}>
                {/* <PositionButtons /> */}
            </TableCell>
            <TableCell className={classes.cell}>
                { canUserEdit ? <ItemOptions itemId={itemId} listId={listId} courseId={courseId} itemData={itemData} /> : null }
            </TableCell>
        </TableRow>
    );
}
 
export default ListItem;