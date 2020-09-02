import React from 'react';
import { TableBody } from '@material-ui/core';
import ListItem from './ListItem/ListItemIndex';

const ListBody = ({ items, courseId }) => {
    return (
        <TableBody>
            {items.map((itemData, index) => {
                return <ListItem key={index} itemData={itemData} courseId={courseId} index={index} />
            })}
        </TableBody>
    );
}
 
export default ListBody;