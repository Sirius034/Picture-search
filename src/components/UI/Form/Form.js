import React from 'react';
import { Input } from '../Input/Input';

export const Form = ({ forms, onChangeHandler, children }) => {
    const inputs = Object.keys(forms).map((controlName, i) => {
        const control = forms[controlName];
        return (
            <div key={i} className="mb-3">
                <Input
                    cls="form-control"
                    type={control.type}
                    label={control.label}
                    value={control.value}
                    onChange={ev => onChangeHandler(ev.target.value, controlName)}
                />
                {!control.valid
                    && control.touch
                    && <span className="text-danger">
                        <i className="fas fa-exclamation-circle"> {control.errorMessage}</i>
                    </span>
                }
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