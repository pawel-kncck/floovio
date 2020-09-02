import React from 'react';
import { TableFooter, TableRow, TableCell } from '@material-ui/core';
import CreateNewExercise from './CreateNewExercise';
import AddLink from './AddLink';
import UploadFile from './UploadFile';

const ListActions = ({ listData, courseId }) => {
    return (
        <TableFooter>
            <TableRow>
                <TableCell colSpan={7}>
                    <CreateNewExercise listData={listData} courseId={courseId} />
                    <AddLink listData={listData} courseId={courseId} />
                    <UploadFile listData={listData} courseId={courseId} />
                </TableCell>
            </TableRow>
        </TableFooter>
    );
}
 
export default ListActions;