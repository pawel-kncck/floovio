import React from 'react';
import OpenItemButton from './OpenItemButton';
import TypeIcon from './TypeIcon';
import ItemName from './ItemName';
import FormatTag from './FormatTag';
import StatusContainer from './StatusContainer';
import PositionButtons from './PositionButtons';
import ItemOptions from './ItemOptions';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        height: '40px',
        paddingLeft: '16px',
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
            backgroundColor: '#fafafa',
        },
    },
})

const ListItem = ({ itemId, listId, courseId, itemData, canUserEdit }) => {
    const classes = useStyles();

    return (
        <div key={itemData.id} className={classes.root} onClick={() => console.log("Item clicked")}>
            <OpenItemButton itemData={itemData} />
            <ItemName name={itemData.name} />
            {/* {(itemData.format) ? <FormatTag type={itemData.format} /> : null} */}
            {/* {(itemData.status) ? <StatusContainer status={itemData.status} /> : null} */}
            {/* <PositionButtons /> */}
            { canUserEdit ? <ItemOptions itemId={itemId} listId={listId} courseId={courseId} itemData={itemData} /> : null }
        </div>
    );
}
 
export default ListItem;