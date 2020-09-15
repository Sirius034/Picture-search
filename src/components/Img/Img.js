import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export const Img = ({ width, height, src, scrollPosition }) => (
    <LazyLoadImage
        className={'card-img'}
        threshold={600}
        alt="Pixabay"
        height={height}
        src={src}
        scrollPosition={scrollPosition}
        effect="blur"
    />
); 