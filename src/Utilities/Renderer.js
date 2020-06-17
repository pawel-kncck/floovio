import React from 'react';
import TextField from '../Application/Lesson/TextField';
import DropDown from '../Application/Lesson/DropDown';
import RadioGroup from '../Application/Lesson/RadioGroup';

const componentMap = {
    textfield: TextField,
    dropdown: DropDown,
    radiogroup: RadioGroup
}

function Renderer(config) {

    if (config.node === "text") {
        return config.text
    } else {
        return React.createElement(
            componentMap[config.tag] || config.tag,
            config.attr,
            config.child && (typeof config.child === "string"
                ? config.child
                : config.child.map(c => Renderer(c)))
        );
    }
}

export default Renderer;