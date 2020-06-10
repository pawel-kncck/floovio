import React, { useState } from 'react';
import styles from './NewParser.module.css';
import TestNewParser from '../Utilities/TestNewParser';

const SimpleParser = () => {
    const [output,setOutput] = useState()

    function transformInput(output) {
        setOutput(TestNewParser(output));
    }

    return (
        <div className={styles.container}>
            <textarea className={styles.input} onChange={(event) => transformInput(event.target.value)}></textarea>
            <div className={styles.output}><div dangerouslySetInnerHTML={output} /></div>
        </div>
    );
}
 
export default SimpleParser;