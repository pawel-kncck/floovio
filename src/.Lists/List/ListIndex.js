import React, { useState } from 'react';
import { makeStyles, Table, Collapse, TableBody, TableCell, TableRow } from '@material-ui/core';
import ListHeader from './ListHeader/ListHeaderIndex';
import ListBody from './ListBody/ListBodyIndex';

const useStyles = makeStyles({
    root: {
        width: '750px',
    },
    table: {
        marginTop: 0,
        marginBottom: '20px',
    },
    cell: {
        borderBottom: 'none',
        padding: 0
    }

})

const List = ({ listData, listId, courseId, user, canUserEdit }) => {
    const classes = useStyles();
    const [collapsed, setCollapsed] = useState(false) 

    const toggleCollapse = () => {
        setCollapsed(!collapsed)
    }

    return (
        <div className={classes.root}>
            <ListHeader listId={listId} listData={listData} courseId={courseId} onCollapse={toggleCollapse} collapsed={collapsed} user={user} canUserEdit={canUserEdit} />
            <Table className={classes.table} size='small'>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={5} className={classes.cell}>
                            <Collapse in={!collapsed} >
                                <Table size='small'>
                                    <ListBody listId={listId} items={listData.items} courseId={courseId} canUserEdit={canUserEdit} />
                                    {/* <ListActions listId={listData.id} courseId={courseId} /> */}
                                </Table>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}
 
export default List;