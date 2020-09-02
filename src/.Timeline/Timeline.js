import React, { useState } from 'react';
import dummyData from './DummyData';
import List from './List/ListIndex';
import AddNewList from './AddNewList';

const Timeline = (props) => {
    // const [listsData, setListsData] = useState(dummyData);
    const courseIdFromPath = props.match.params.courseId || null;

    return (
        <>
            {dummyData.lists.map((listData, index) => {
                return <List key={index} listData={listData} courseId={courseIdFromPath} />
            })}
            <AddNewList />
        </>
    );
}
 
export default Timeline;