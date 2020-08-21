import React from 'react';
import { Auth } from '../containers/Auth/Auth';

export const Login = () => {
    return (
        <div className="py-3">
            <h1 className="text-center mb-5">Авторизация</h1>
            <Auth />
        </div>
    );
}