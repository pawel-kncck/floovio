import React, { useState } from 'react';
import { Select, Chip, MenuItem } from '@material-ui/core';

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
    const [status, setStatus] = useState(props.status);

    const handleChange = (event) => {
        setStatus(event.target.value);
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