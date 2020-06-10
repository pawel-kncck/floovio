import React from 'react';

const Backdrop = (props) => {
    const backdropStyles = {
        zIndex: 900,
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        right: 0,
        bottom: 0,
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        WebkitTapHighlightColor: 'transparent',
    };

    if (props.show) {
        return (
            <div className='backdrop' style={backdropStyles}>
                {props.children}
            </div>
            );
        }
        return null;
};

export default Backdrop;