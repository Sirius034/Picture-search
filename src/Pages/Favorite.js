import React from 'react';
import { FavoriteCards } from '../containers/FavoriteCards/FavoriteCards';

export const Favorite = () => {
    return (
        <div className="container-fluid pt-3">
            <h1 className="text-center mb-4">Избраное</h1>
            
            <FavoriteCards />
        </div>
    );
}