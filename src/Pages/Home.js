import React from 'react';
import { Cards } from '../containers/Cards/Cards';
import { Search } from '../containers/Search/Search';
import { Control } from '../containers/Control/Control';

export const Home = () => {
    return (
        <div className="container-fluid pt-3">
            <h1 className="text-center mb-4"> Главная страница </h1>
            <Search />
            
            <Control />
            
            <Cards />
        </div>
    )
}