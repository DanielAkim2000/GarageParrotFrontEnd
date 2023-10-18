import React from 'react';
import { Link } from 'react-router-dom';

const SlideMenu = () => {
    return (
        <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/"> </Link></li>
            <li><Link to="/"></Link></li>
            <li><Link to="/"></Link></li>

        </ul>
    );
}


export { SlideMenu };
