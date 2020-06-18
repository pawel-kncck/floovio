import React from 'react';
import PassiveTextField from '../Application/Lesson/PassiveTextField';
import DropDown from '../Application/Lesson/DropDown';
import RadioGroup from '../Application/Lesson/RadioGroup';

const componentMap = {
    textfield: PassiveTextField,
    dropdown: DropDown,
    radiogroup: RadioGroup
}

function makeId(n) {
    return Math.random().toString(36).substr(2, n);
};

function Renderer(config) {

    if (config.node === "text") {
        return config.text
    } else {
        return React.createElement(
            componentMap[config.tag] || config.tag,
            { ...config.attr, key: makeId(4) },
            config.child && (typeof config.child === "string"
                ? config.child
                : config.child.map(c => Renderer(c)))
        );
    }
}

export default Renderer;