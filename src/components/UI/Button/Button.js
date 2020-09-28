import React from 'react';
import classes from './Button.module.scss';

export const Button = (props) => {
    const type = props.type || 'primary';
    const cls = ['btn', `btn-${type}`, classes.Button];

    if (props.setStyle) {
        cls.push(props.setStyle);
    }

    return (
        <button
            type={type}
            className={cls.join(' ')}
            disabled={props.disabled}
            onClick={props.onClick}
        >{props.children}</button>
    )
}

