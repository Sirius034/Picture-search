import React, { useContext, useEffect } from 'react';
import Gallery from '../components/Gallery/Gallery';
import { PixabayContect } from '../context/pixbay/pixabayContext';
import { FirebaseContext } from '../context/firebase/firebaseContext';

export const FavoriteCards = () => {
    // запрос в базу и state
    const { loading, getShosen } = useContext(PixabayContect);
    const { user, removeFavorites } = useContext(FirebaseContext);

    useEffect(() => {
        getShosen(); //вынести в фаире басе
        // eslint-disable-next-line
    }, []);

    return <Gallery imges={user.chosen} loading={loading} handler={removeFavorites} type={'danger'} />
}