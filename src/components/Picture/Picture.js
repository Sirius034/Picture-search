import React from 'react';
import classes from './Picture.module.css';

export const Picture = ({ src, onClick, children }) => (
    <div className={classes.Picture}>
        {children}
        <div className={classes.view}>
            <span type="button" className="close" aria-label="Close" onClick={onClick}>
                <i className="far fa-times-circle"></i>
            </span>
            <img src={src} aria-hidden alt="Responsive image" />
        </div>
    </div>
);
