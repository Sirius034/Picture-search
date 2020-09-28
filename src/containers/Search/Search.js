import React, { useState, useContext, useEffect } from 'react';
import { Input } from '../../components/UI/Input/Input';
import { PixabayContect } from '../../context/pixbay/pixabayContext';
import classes from './Search.module.scss';

export const Search = () => {
    const { search, setSearch } = useContext(PixabayContect);
    const [value, setValue] = useState('');

    useEffect(() => {
        setValue(search);
        // eslint-disable-next-line
    }, []);

    const handlerChange = (value) => {
        setValue(value);
        if (!value) {
            setSearch(value);
        }
    }

    const onSubmit = (ev) => {
        if (ev.key === 'Enter' && value) {
            setSearch(value);
        }
    }

    return (
        <div className={`col-10 ${classes.Search}`}>
            <div className={classes.icon_search}>
                <i className="fas fa-search"></i>
            </div>
            <Input
                cls="form-control"
                placeholder="Поиск"
                value={value}
                onChange={ev => handlerChange(ev.target.value)}
                onKeyPress={onSubmit}
            />
        </div>
    )
} 