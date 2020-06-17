import React, { useState } from 'react';
import EditorComponent from "../Editor/Editor";
import AddIcon from '@material-ui/icons/Add';
import Tag from '../../../Components/Tags';
import { neUpdateTitle,neUpdateRawHtml,neUpdateTags } from '../../../Store/oldActions';
import { connect } from 'react-redux';

const EditingView = (props) => {
    const [tagInput, setTagInput] = useState("");

    function changeHandler(e) {
        setTagInput(e.target.value);
        props.neUpdateTags(e.target.value.split(','))
    };

    return (

        <div className="builder-dialog-body">

            <input type="text" placeholder="Insert your title..." className="builder-title" onChange={(event) => props.neUpdateTitle(event.target.value)} value={props.storeTitle} />
            <EditorComponent transformOutput={(content) => props.neUpdateRawHtml(content)} initialContent={props.storeRawHtml} />
            <div className="bilder-tag-input">
                <input type="text" placeholder="Insert tags..." className="bilder-tag-input-field" value={tagInput} onChange={changeHandler}></input>
                <span className="bilder-tag-input-icon"><AddIcon /></span>
            </div>
            <div className={(props.storeTags.length < 1) ? "bilder-tag-array collapsed" : "bilder-tag-array expanded"}>
                {props.storeTags.map((el,index) => {
                    return (
                        <Tag key={index} value={el} />
                    )
                })}

            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
      storeTitle: state.newExercise.title,
      storeRawHtml: state.newExercise.rawHtml,
      storeTags: state.newExercise.tags
    }
}

const mapDispatchToProps = dispatch => {
    return {
        neUpdateTitle: title => {dispatch(neUpdateTitle(title))},
        neUpdateRawHtml: rawHtml => {dispatch(neUpdateRawHtml(rawHtml))},
        neUpdateTags: tagsArray => {dispatch(neUpdateTags(tagsArray))},
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(EditingView);