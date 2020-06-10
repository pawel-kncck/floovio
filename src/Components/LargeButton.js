import React from 'react';

const BaseButton = (props) => {
    let btnClassName = () => {
        if (props.primary && !props.secondary){
            return "btn-large primary"
        } else if (!props.primary && props.secondary){
            return "btn-large secondary"
        } else {
            return "btn-large"
        }
    }
    return (
        <button
            className={btnClassName()}
            onClick={props.onClick}
        >{props.value}</button>
    );
}
 
export default BaseButton;