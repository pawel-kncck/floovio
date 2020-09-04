import React from 'react';
import FoovioTextField from '../Items/FloovioTextField';
import FloovioDropDown from '../Items/FloovioDropDown';
import FloovioRadioGroup from '../Items/FloovioRadioGroup';
import FloovioTextArea from '../Items/FloovioTextArea';
import ImageElement from '../../.Item/ImageElement';

const componentMap = {
    hyphentextfield: FoovioTextField,
    hyphendropdown: FloovioDropDown,
    hyphenradiogroup: FloovioRadioGroup,
    hyphentextarea: FloovioTextArea,
    hyphenimage: ImageElement,
}

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