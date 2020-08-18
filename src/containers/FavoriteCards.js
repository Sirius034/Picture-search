import React, { useContext } from 'react';
import Gallery from '../components/Gallery/Gallery';
import { PixabayContect } from '../context/pixbay/pixabayContext';
import { FirebaseContext } from '../context/firebase/firebaseContext';

export const FavoriteCards = () => {
    const { loading } = useContext(PixabayContect);
    const { user, removeFavorites } = useContext(FirebaseContext);

    return <Gallery imges={user.chosen} loading={loading} handler={removeFavorites} type={'danger'} />
}