import React, { useState, useContext } from 'react';
import { Input } from '../../components/UI/Input';
import { PixabayContect } from '../../context/pixbay/pixabayContext';
import classes from './Search.module.css';

export const Search = () => {
    const [value, setValue] = useState('');

    const pixabay = useContext(PixabayContect);

    const handlerChange = (value) => {
        setValue(value);
        if (!value) {
            pixabay.getPictures();
        }
    }

    const onSubmit = (ev) => {
        if (ev.key === 'Enter' && value) {
            pixabay.clearPictures();
            pixabay.setSearch(value);
        }
    }

    return (
        <div className="col-10 my-5 mx-auto">
            <div className={classes.icon_search}>
                <i className="fas fa-search"></i>
            </div>
            <Input
                placeholder="Поиск"
                value={value}
                handler={ev => handlerChange(ev.target.value)}
                onKeyPress={onSubmit}
            />
        </div>
    )
} 