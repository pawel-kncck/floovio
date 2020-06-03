import React, { useState } from 'react';
import HTMLTransformer from '../../Utilities/HTMLTransformer';
import BaseButton from "../../Components/BaseButton";
import * as utilities from "../../Utilities/Utilities";

const Solver = (props) => {
    const [sharableLink, setSharableLink] = useState("")
    const randomUrl = utilities.makeid(7)

    return (
        <div className="app-solver">
            <h1>Solver</h1>
            <div className="solver">
                <div className="solver-title">TITLE</div>
                <div className="solver-body">
                    <div dangerouslySetInnerHTML={HTMLTransformer("<p>Example</p><ul><li>[X] Option 1</li><li>[X] Option 2</li><li>[X] Option 3</li>")} />
                </div>
                <div className="solver-footer">
                    <BaseButton value="Save" />
                    <BaseButton 
                        value="Share" 
                        onClick={() => setSharableLink("dummy sharable link")}/>
                    <div 
                        className={sharableLink === "" ? "solver-solution-link" : "solver-solution-link active"}
                        >
                            {sharableLink === "" ? null : <a href="/">http://www.dialetton.com/solve/{randomUrl}</a>}
                        </div>
                </div>
            </div>
        </div>
        

    );
}
 
export default Solver;