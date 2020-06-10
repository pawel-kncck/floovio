import React from 'react';

const BaseButton = (props) => {
    let btnClassName = () => {
        if (props.primary && !props.secondary){
            return "btn primary"
        } else if (!props.primary && props.secondary){
            return "btn secondary"
        } else {
            return "btn"
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