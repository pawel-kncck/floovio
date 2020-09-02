import React from 'react';
import { TableHead, TableRow, TableCell } from '@material-ui/core';
import ExpandListButton from './ExpandListButton';
import ListName from './ListName';
import NewItemButton from './NewItemButton';
import ListOptions from './ListOptions/ListOptionsIndex';

const ListHeader = (props) => {
    return (
        <TableHead>
            <TableRow>
                <TableCell><ExpandListButton onToggle={props.onCollapse} collapsed={props.collapsed} /></TableCell>
                <TableCell><ListName name={props.listData.name} /></TableCell>
                <TableCell></TableCell>
                <TableCell><NewItemButton listData={props.listData} /></TableCell>
                <TableCell><ListOptions listData={props.listData} courseId={props.courseId} /></TableCell>
            </TableRow>
        </TableHead>
    );
}
 
export default ListHeader;