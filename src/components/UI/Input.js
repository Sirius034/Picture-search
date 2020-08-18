import React from 'react';

export const Input = ({ label, type, placeholder = null, value, handler, onKeyPress}) => {
    const typeInput = type || 'text';
    const htmlFor = `${typeInput}-${Math.random()}`;

    return (
        <div className="form-group">
            { !placeholder && <label htmlFor={htmlFor}>{ label }</label> }

            <input 
                className="form-control pl-4" 
                id={htmlFor} 
                type={typeInput} 
                placeholder={placeholder} 
                value={value}
                onChange={handler}
                onKeyPress={onKeyPress}
            />
        </div>
    );
}