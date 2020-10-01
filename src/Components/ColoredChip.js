import React from 'react';

const ColoredChip = ({rgbBackgroung, label}) => {
    const styles = {
        root: {
            height: '32px',
            borderRadius: '16px',
            background: `rgb(${rgbBackgroung.red}, ${rgbBackgroung.green}, ${rgbBackgroung.blue})`,
            display: 'inline-flex',
            alignItems: 'center',
            verticalAlign: 'middle',
            justifyContent: 'center',
            whiteSpace: 'nowrap',
            border: 'none',
        },
        span: {
            paddingRight: '12px',
            paddingLeft: '12px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
        }
    }

    return (
        <div style={styles.root}>
            <span style={styles.span}>{label}</span>
        </div>
    );
}
 
export default ColoredChip;