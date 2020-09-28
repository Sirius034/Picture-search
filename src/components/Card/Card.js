import React, { useRef, useEffect, useState } from 'react';
import classes from './Card.module.scss';
import { Img } from '../Img/Img';

export const Card = (props) => {
    const divElement = useRef(null);
    const [dimensions, setDimensions] = useState(null);

    useEffect(() => {
        setDimensions({
            width: divElement.current.offsetWidth,
            height: props.height / (props.width / divElement.current.offsetWidth)
        });
        // eslint-disable-next-line
    }, [divElement]);

    const onClick = (e) => {
        props.viewHandlers(props.src)
    }

    return (
        <div
            ref={divElement}
            className={`card bg-dark text-white ${classes.Card} my-2`}
            onClick={onClick}
        >
            {
                dimensions &&
                <Img width={dimensions.width} height={dimensions.height} scrollPosition={props.scrollPosition} src={props.src} />
            }

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
