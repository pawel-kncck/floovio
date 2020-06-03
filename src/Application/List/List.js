import React from 'react';
import Accordion from './Accordion/Accordion'

const List = () => {
    return (
        <div className="app-list">
            <h1>List</h1>
            <Accordion title="Title A" tags={["tagA_1","tagA_2","tagA_3"]} content={"<p>Content of dummy <em>exercise</em> A</p>"}/>
            <Accordion title="Title B" tags={["tagB_1","tagB_2","tagB_3"]} content={"<p>Content of dummy <strong>exercise</strong> B</p>"}/>
            <Accordion title="Title C" tags={["tagC_1","tagC_2","tagC_3"]} content={"<p>Content of <del>dummy</del> <ins>exercise</ins> C</p>"}/>
        </div>
    );
}
 
export default List;