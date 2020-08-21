import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import classes from './Card.module.css';

export const Card = (props) => {
    const onClick = (e) => {
        if(e.target.tagName !== 'BUTTON') {
            props.viewHandlers(props.src)
        } 
    }
    
    return (
        <div className={`card bg-dark text-white ${classes.block} my-3`}
            onClick={onClick}
        >

            <LazyLoadImage
                className={'card-img'}
                threshold={600}
                alt="Pixabay"
                width={'100%'}
                height={props.height}
                src={props.src}
                scrollPosition={props.scrollPosition}
                effect="blur"
            />

            <div className={`card-img-overlay ${classes.overlay}`}>
                <a href={props.pixabay} target="_blank" rel="noopener noreferrer">
                    <img
                        src='https://pixabay.com/static/img/logo.png'
                        className={classes.pixabay_logo}
                        alt="Pixabay" />
                </a>

                <p className="card-title">{props.tags.toUpperCase()}</p>

                {props.children}
            </div>
        </div>
    );
}
