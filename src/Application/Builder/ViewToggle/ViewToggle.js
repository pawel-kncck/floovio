import React, { useState } from 'react';

const ViewToggle = (props) => {
    const [editorMode,setEditorMode] = useState(true);

    function toggleHandler(e){
        setEditorMode(!editorMode);
        props.toggleEditorPreview(e.target.id);
    }

    return (
        <div className="toggle-view">
            <div className="toggle-view-mainlabel">View</div>
            <div className="toggle-view-buttongroup">
                <div className={`toggle-view-button ${editorMode ? 'active' : 'inactive'}`} onClick={toggleHandler} id="editor">Editor</div>
                <div className={`toggle-view-button ${!editorMode ? 'active' : 'inactive'}`} onClick={toggleHandler} id="preview">Preview</div>
            </div>
        </div>
    );
}
 
export default ViewToggle;