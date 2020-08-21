import React, { useContext, Fragment, useEffect } from 'react';
import Gallery from '../components/Gallery/Gallery';
import { PixabayContect } from '../context/pixbay/pixabayContext';
import { FirebaseContext } from '../context/firebase/firebaseContext';
import { Pagination } from '../components/Pagination/Pagination';
import { Loading } from '../components/UI/Loading';


export const Cards = () => {
    const { hits, loading, page, nextPageData, getPictures } = useContext(PixabayContect);
    const { token, addToFavorites } = useContext(FirebaseContext);

    useEffect(() => {
      getPictures();
      // eslint-disable-next-line
    }, []);

    const nextPageHandler = () => {
        nextPageData(page + 1);
    }

    const previousPageHandler = () => {
        if (page === 1) return;

        nextPageData(page - 1);
    }

    if (loading) return <Loading />

    return (
        <Fragment>
            <Gallery
                token={token}
                imges={hits}
                loading={loading}
                handler={addToFavorites}
                type="success" />
                
            <Pagination
                page={page}
                nextPageHandler={nextPageHandler}
                previousPageHandler={previousPageHandler} />
        </Fragment>
    );
}
