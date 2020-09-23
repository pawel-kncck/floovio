import React from 'react';
import { Typography } from '@material-ui/core';

const styles = {
    root: {
        flexGrow: 1,
        padding: '7px 16px',
    }
}

const ItemName = ({ name }) => {
    return (
        <div style={styles.root}>
            <Typography variant='body2' color='textPrimary' >
                {name}
            </Typography>
        </div>

        
    );
}
 
export default ItemName;