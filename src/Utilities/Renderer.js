import React from 'react';
import PassiveTextField from '../Application/Lesson/PassiveTextField';
import DropDown from '../Application/Lesson/DropDown';
import PassiveDropDown from '../Application/Lesson/PassiveDropDown';
import RadioGroup from '../Application/Lesson/RadioGroup';
import PassiveRadioGroup from '../Application/Lesson/PassiveRadio';

const componentMap = {
    hyphentextfield: PassiveTextField,
    hyphenradiogroup: PassiveRadioGroup,
    hyphendropdown: PassiveDropDown,
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
            { ...config.attr, key: ((config.attr) ? ((config.attr.id) ? config.attr.id : null ) : null) },
            config.child && (typeof config.child === "string"
                ? config.child
                : config.child.map(c => Renderer(c)))
        );
    }
}

export default Renderer;