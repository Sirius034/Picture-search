import React from 'react';
import { Input } from './Input';

export const Form = ({ forms, onChangeHandler, children }) => {
    const inputs = Object.keys(forms).map((controlName, i) => {
        const control = forms[controlName];
        return (
            <div key={i} className="form-group">
                <Input
                    cls="form-control"
                    type={control.type}
                    label={control.label}
                    value={control.value}
                    onChange={ev => onChangeHandler(ev.target.value, controlName)}
                />
            </div>
        );
    });

    const handlerSubmit = (ev) => {
        ev.preventDefault();
    }

    return (
        <form onSubmit={handlerSubmit}>
            {inputs}
            {children}
        </form>
    );
}