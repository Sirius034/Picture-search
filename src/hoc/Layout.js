import React, { useContext, Fragment } from 'react';
import { Navigation } from '../components/Navigation/Navigation';
import { FirebaseContext } from '../context/firebase/firebaseContext';

export const Layout = ({ children }) => {
    const { token } = useContext(FirebaseContext);
    return (
        <Fragment>
            <Navigation token={token} />
            <div className="constainer-fluid">
                {children}
            </div>
        </Fragment>
    );
}