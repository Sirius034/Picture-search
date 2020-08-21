import React, { Fragment } from 'react';

export const Input = ({cls, label, type, name, placeholder, value, onChange, onKeyPress, onClick }) => {
    const typeInput = type || 'text';
    const htmlFor = `${typeInput}-${Math.random()}`;
    return (
        <Fragment>
            {label && <label htmlFor={htmlFor}>{label}</label>}

            <input
                className={cls}
                id={htmlFor}
                type={typeInput}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyPress={onKeyPress}
                onClick={onClick}
            />
        </Fragment>
    );
}