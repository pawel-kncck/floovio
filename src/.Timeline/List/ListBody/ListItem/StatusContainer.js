import React, { useState } from 'react';
import { FormControl, Select, Chip, MenuItem, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    border: 0,
  },
  formControl: {
    padding: 0
  },
  MuiInputBase: {
    padding: 0
  }
})

const statusValues = ['Completed','Todo','In progress'];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const StatusContainer = (props) => {
    const classes = useStyles();
    const [status, setStatus] = useState(props.status);

    const handleChange = (event) => {
        setStatus(event.target.value);
    }

    const selectStyle = {
      '&input': {
        padding: 0
      }
    }

    return (
        <>
            <Select
                id='status-select'
                disableUnderline
                value={status}
                onChange={handleChange}
                MenuProps={MenuProps}
                renderValue={selected => <Chip label={selected} />}
                style={selectStyle}
            >{statusValues.map((value) => (
                <MenuItem key={value} value={value} >
                  {value}
                </MenuItem>
              ))}
            </Select>
        </>
    );
}
 
export default StatusContainer;