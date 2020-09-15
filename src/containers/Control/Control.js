import React, { useContext } from 'react';
import classes from './Control.module.css';
import { ImegeSort } from '../../components/ImegeSort/ImegeSort';
import { ImageOutput } from '../../components/ImageOutput/ImageOutput';
import { PixabayContect } from '../../context/pixbay/pixabayContext';

export const Control = () => {
    const { setPerPage, setOrder, order} = useContext(PixabayContect);

    const orderHandler = (order) => {
        setOrder(order);
    }  
    
    const perPageHandler = (quantity) => {
        setPerPage(quantity);
    }

    return (
        <div className={`col-12 bg-dark ${classes.Control}`}>
                <ImegeSort orderHandler={orderHandler} order={order} />
                <ImageOutput perPageHandler={perPageHandler}/>
        </div>
    );
}