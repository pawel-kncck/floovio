import React from 'react';
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

const PassiveRadioGroup = (props) => {
    
    return (
        <RadioGroup name={props.id}>
            {props.options.map((el,index) => {
                return <FormControlLabel value={el} control={<Radio />} label={el} />
            })}
        </RadioGroup>
    );
}

export default PassiveRadioGroup;