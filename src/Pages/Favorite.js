import React from 'react';
import { FavoriteCards } from '../containers/FavoriteCards';

export const Favorite = () => {
    return (
        <div className="py-4">
            <h1 className="text-center mb-4">Избраное</h1>
            
            <FavoriteCards />
        </div>
    );
}