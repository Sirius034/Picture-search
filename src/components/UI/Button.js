import React from 'react';

export const Button = (props) => {
    const type = props.type || 'primary';
    return (
        <button
            type={type}
            className={`btn btn-${type} btn mr-3`}
            disabled={props.disabled}
            onClick={props.onClick}
        >{props.children}</button>
    )
}

