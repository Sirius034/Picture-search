import React from 'react';
import classes from './ViewPicture.module.css';

export const ViewPicture = ({ src, onClick }) => (
    <div className={classes.ViewPicture} onClick={onClick}>
        <div className={classes.picture}>
            <img src={src} aria-hidden alt="Responsive image" />
        </div>
    </div>
);
