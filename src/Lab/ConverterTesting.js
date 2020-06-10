import React, { useState } from 'react';
import Editor from '../Application/Builder/Editor/Editor'
import HTMLParser from '../Utilities/TestNewParser';
import HTML2json from '../Utilities/html2json';

const Tester = () => {
    const [editorOutput, setEditorOutput] = useState("")
    function renderer(config) {
        if (config.node === "text") {
            return config.text
        } else {
            return React.createElement(
                config.tag,
                config.attr,
                config.child && (typeof config.child === "string"
                    ? config.child
                    : config.child.map(c => renderer(c)))
            );
        }
    }

    return (
        <div>
            <div>
                <Editor transformOutput={(output) => setEditorOutput(output)} />
            </div>
            <div>
                <div>
                    {(editorOutput !== "") ? HTMLParser(editorOutput).__html : null}
                </div>
            </div>
            <div>
                <div>
                    {(editorOutput !== "") ? JSON.stringify(HTML2json(HTMLParser(editorOutput).__html), null, "\n") : null}
                </div>
            </div>
            <div>
                {/* {(editorOutput !== "") ? renderer(HTML2json(HTMLParser(editorOutput))) : null} */}
            </div>
        </div>
    );
}
 
export default Tester;

