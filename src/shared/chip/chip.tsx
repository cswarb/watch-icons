import React from 'react';

export const Chip = React.forwardRef(function Chip(props: any, ref: any) {
    return (
        <div {...props} ref={ref} className="tooltip-container">
            <p className="tooltip-content">{props.children}</p>
            <span className="tooltip-icon tooltip-icon--question"></span>
        </div>
    )
});
