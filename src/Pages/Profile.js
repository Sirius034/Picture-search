import React from 'react';
import { User } from '../containers/User';

export const Profile = () => {
    return (
        <div className="py-3">
            <h1 className="text-center mb-5">Профиль пользователя</h1>
            <User />
        </div>
    )
}