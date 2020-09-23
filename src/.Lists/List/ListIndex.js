import React, { useState } from 'react';
import LessonHeader from './ListHeader/LessonHeaderIndex';
import LessonBody from './ListBody/LessonBodyIndex';
import { Collapse } from '@material-ui/core';

const styles = {
    root: {
        width: '750px',
    },
}

const List = ({ listData, listId, courseId, user, canUserEdit }) => {
    const [collapsed, setCollapsed] = useState(false) 

    const toggleCollapse = () => {
        setCollapsed(!collapsed)
    }

    return (
        <div style={styles.root}>
            <LessonHeader listId={listId} listData={listData} courseId={courseId} onCollapse={toggleCollapse} collapsed={collapsed} user={user} canUserEdit={canUserEdit} />
            <Collapse in={!collapsed}>
                <LessonBody listId={listId} items={listData.items} courseId={courseId} canUserEdit={canUserEdit} />
            </Collapse>
        </div>
    );
}
 
export default List;