import React from 'react';
import { UserProfile } from '../containers/UserProfile/UserProfile';

export const Profile = () => {
    return (
        <div className="py-3">
            <h1 className="text-center mb-5">Профиль пользователя</h1>
            <UserProfile />
        </div>
    )
}