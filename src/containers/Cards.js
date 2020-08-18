import React, { useContext, useEffect, Fragment } from 'react';
import Gallery from '../components/Gallery/Gallery';
import { PixabayContect } from '../context/pixbay/pixabayContext';
import { FirebaseContext } from '../context/firebase/firebaseContext';
import { Pagination } from './Pagination';

export const Cards = () => {
    const { hits, loading, getPictures } = useContext(PixabayContect);
    const { addToFavorites } = useContext(FirebaseContext);

    useEffect(() => {
        getPictures();
        // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <Gallery imges={hits} loading={loading} handler={addToFavorites} type={'success'} />
            <Pagination />
        </Fragment>
    );
}
