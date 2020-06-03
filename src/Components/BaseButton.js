import React from 'react';

const BaseButton = (props) => {
    return (
        <button
            className="btn"
            onClick={props.onClick}
        >{props.value}</button>
    );
}
 
export default BaseButton;