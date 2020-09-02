import React, { useState } from 'react';
import { makeStyles, Table, Collapse, TableBody, TableCell, TableRow } from '@material-ui/core';
import ListHeader from './ListHeader/ListHeaderIndex';
import ListBody from './ListBody/ListBodyIndex';
import ListActions from './ListActions/ListActionsIndex';

const useStyles = makeStyles({
    root: {
        marginTop: 0,
        marginBottom: '20px',
    },
    cell: {
        borderBottom: 'none',
    }

})

const List = ({ listData, courseId }) => {
    const classes = useStyles();
    const [collapsed, setCollapsed] = useState(false) 

    const toggleCollapse = () => {
        setCollapsed(!collapsed)
    }

    return (
        <>
            <ListHeader listData={listData} courseId={courseId} onCollapse={toggleCollapse} collapsed={collapsed} />
            <Table className={classes.root} size='small'>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={5} className={classes.cell}>
                            <Collapse in={!collapsed} >
                                <Table size='small'>
                                    <ListBody items={listData.items} courseId={courseId} />
                                    {/* <ListActions listId={listData.id} courseId={courseId} /> */}
                                </Table>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    );
}
 
export default List;