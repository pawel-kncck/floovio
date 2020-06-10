import React from 'react';
import { connect } from 'react-redux';

const PreviewView = (props) => {
    
    return (
        <div className="builder-dialog-body">
            {props.content !== "" ? <div dangerouslySetInnerHTML={props.content} /> : null}
        </div>
    )
}

const mapStateToProps = state => {
    return {
      content: state.newExercise.transformedHtml
    }
}
 
export default connect(mapStateToProps)(PreviewView);