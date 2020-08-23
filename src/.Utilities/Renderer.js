import React from 'react';
import PassiveTextField from '../.Item/PassiveTextField';
import PassiveDropDown from '../.Item/PassiveDropDown';
import PassiveRadioGroup from '../.Item/PassiveRadio';
import TextAreaElement from '../.Item/TextAreaElement';
import AudioPlayer from '../.Lab/AudioPlayer';
import ImageElement from '../.Item/ImageElement';

const componentMap = {
    hyphentextfield: PassiveTextField,
    hyphenradiogroup: PassiveRadioGroup,
    hyphendropdown: PassiveDropDown,
    hyphenimage: ImageElement,
    hyphentextarea: TextAreaElement,
    hyphenaudio: AudioPlayer,
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