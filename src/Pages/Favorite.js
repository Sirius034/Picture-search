import React from 'react';
import { FavoriteCards } from '../containers/FavoriteCards';

export const Favorite = () => {
    return (
        <div className="col-12 py-2">
            <h1 className="text-center">Избраное</h1>
            
            <FavoriteCards />
        </div>
    );
}