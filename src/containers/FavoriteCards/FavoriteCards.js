import React, { useContext } from 'react';
import Gallery from '../../components/Gallery/Gallery';
import { FirebaseContext } from '../../context/firebase/firebaseContext';

export const FavoriteCards = () => {
    const { token, user, removeFavorites } = useContext(FirebaseContext);

    return <Gallery imges={user.chosen} handler={removeFavorites} type="danger" token={token} />
}