import React, { useContext } from 'react';
import { Navigation } from '../components/Navigation/Navigation';
import { FirebaseContext } from '../context/firebase/firebaseContext';

export const Layout = ({ children }) => {
    const { token } = useContext(FirebaseContext);
    return (
        <>
            <Navigation token={token} />
            
            {children}
        </>
    );
}