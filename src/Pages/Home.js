import React from 'react';
import { Cards } from '../containers/Cards';
import { Search } from '../containers/Search/Search';

export const Home = () => {
    return (
        <div className="py-4">
            <h1 className="text-center"> Главная страница </h1>
            <Search />
            
            <Cards />
        </div>
    )
}