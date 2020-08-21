import React from 'react';
import classes from './Picture.module.css';

export const Picture = ({ src, onClick, children }) => (
    <div className={classes.Picture} onClick={onClick}>
        {children}
        <div className={classes.view}>
            <img src={src} aria-hidden alt="Responsive image" />
        </div>
    </div>
);
