import React from 'react';
import classes from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';


export const Navigation = ({ token }) => {
    const links = [
        { to: '/', exact: true, label: 'Главная страница' }
    ];

    if (!token) {
        links.push({ to: '/login', exact: false, label: 'Авторизация' });
        links.push({ to: '/about', exact: false, label: 'Информация' });
    } else {
        links.push({ to: '/profile', exact: false, label: 'Профиль' });
        links.push({ to: '/favorite', exact: false, label: 'Избранное' });
        links.push({ to: '/about', exact: false, label: 'Информация' });
    }

    const renderLinks = () => {
        return links.map((link, i) => (
            <li key={i} className="nav-item">
                <NavLink
                    to={link.to}
                    exact={link.exact}
                    className="nav-link">{link.label}</NavLink>
            </li>
        ))
    }

    return (
        <Navbar bg="light" className={`navbar navbar-expand-sm sticky-top navbar-dark bg-dark ${classes.shadow_block}`} expand="lg">
            <span className="navbar-brand mb-0 h1">Search Pictures</span>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <ul className="navbar-nav">
                    {renderLinks()}
                </ul>
            </Navbar.Collapse>
        </Navbar>
    );
}