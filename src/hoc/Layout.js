import React, { Fragment } from 'react';
import { NavBar } from '../components/Navigation/NavBar';

export const Layout = ({ children }) => {
    return (
        <Fragment>
            <NavBar />
            <div className="constainer-fluid">
                {children}
            </div>
        </Fragment>
    );
}