import React from 'react';
import { TableBody, makeStyles } from '@material-ui/core';
import ListItem from './ListItem/ListItemIndex';

const ListBody = ({ items, courseId, listId, canUserEdit }) => {

    return (
        <TableBody>
            {(Boolean(items) && Object.keys(items).length !== 0)
                ?   Object.entries(items)
                        .sort((a, b) => {
                            return (a[1].createdAt < b[1].createdAt ? -1 : (a[1].createdAt > b[1].createdAt ? 1 : 0))
                        })
                        .map(([itemId, itemData]) => {
                            return <ListItem key={itemId} itemId={itemId} listId={listId} itemData={itemData} courseId={courseId} canUserEdit={canUserEdit} />
                    })
                : null
            }
        </TableBody>
    );
}
 
export default ListBody;