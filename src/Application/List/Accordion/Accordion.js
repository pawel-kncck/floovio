import React, { useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Tag from '../../../Components/Tags';
import DOMPurify from 'dompurify';

const Accordion = (props) => {
    const [expanded, setExpanded] = useState(false);
    let contentPanelClass;
    if (expanded) {
        contentPanelClass = "content-panel expanded"
    } else {
        contentPanelClass = "content-panel collapsed"
    }

    function createMarkup() {
        return {__html: DOMPurify.sanitize(props.content)}
    }

    return (
        <div className="accordion">
            <div className="top-panel">
                <div className="title">{props.title}</div>
                <div className="tags">
                    {props.tags.map((el,index) => {
                        return (
                            <Tag key={index} value={el} />
                        )
                    })} 
                </div>
                <div className="icon" onClick={() => setExpanded(!expanded)}>
                    {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </div>
            </div>
            <div className={contentPanelClass}>
                <div className="content">
                    <div dangerouslySetInnerHTML={createMarkup()} />
                </div>
            </div>
        </div>
    );
}

 
export default Accordion;