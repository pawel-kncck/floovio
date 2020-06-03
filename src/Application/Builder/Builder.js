import React, { useState } from 'react';
import BaseButton from "../../Components/BaseButton"
import EditorComponent from "./Editor/Editor";
import AddIcon from '@material-ui/icons/Add';
import Tag from '../../Components/Tags';

const Builder = () => {
    const [tagArray, setTagArray] = useState("");

    function changeHandler(e) {
        console.log(e.target.value);
        setTagArray(e.target.value)
    };

    return (
        <div className="app-builder">
            <h1>Builder</h1>
            <input type="text" placeholder="Insert your title..." className="builder-title"></input>
            <EditorComponent />
            <div className="bilder-tag-input">
                <input type="text" placeholder="Insert tags..." className="bilder-tag-input-field" value={tagArray} onChange={changeHandler}></input>
                <span className="bilder-tag-input-icon"><AddIcon /></span>
            </div>
            <div className={(tagArray === "") ? "bilder-tag-array collapsed" : "bilder-tag-array expanded"}>
                {tagArray.split(',').map((el,index) => {
                    return (
                        <Tag key={index} value={el} />
                    )
                })}
            </div>
            <BaseButton value="Preview" />
            <BaseButton value="Save" />
        </div>
    );
}
 
export default Builder;