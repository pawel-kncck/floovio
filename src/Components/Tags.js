import React from 'react';

const Tag = (props) => {
    return (
        <div className="tag">
            <div>{props.value}</div>
        </div>
    );
}
 
export default Tag;