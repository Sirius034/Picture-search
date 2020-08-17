import React from 'react';
import { Input } from './Input';

export const Form = ({ forms, onChangeHandler, children }) => {
    const inputs = Object.keys(forms).map((controlName, i)=> {
        const control = forms[controlName];
        return (
            <Input 
                key={i}
                type={control.type}
                label={control.label}
                value={control.value}
                handler={ev => onChangeHandler(ev.target.value, controlName)}
            />
        )
    });

    const handlerSubmit = (ev) => {
        ev.preventDefault();
    }

    return (
        <form onSubmit={handlerSubmit}>
            { inputs }
            { children }
        </form>
    );
}