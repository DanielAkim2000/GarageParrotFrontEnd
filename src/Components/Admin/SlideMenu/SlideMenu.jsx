import React from 'react';
import { Link } from 'react-router-dom';

const SlideMenu = () => {
    return (
        <ul style={{borderRight: 'solid 1px',paddingRight : '10px'}} >
            <li>
                <Link to="/Admin">Accueil</Link>
            </li>
            <li>
                <Link to="/Admin/Services">Services</Link>
                <ul className='d-flex flex-column'>
                    <Link to="/Admin/Services/Index">Liste</Link>
                    <Link to="/Admin/Services/Add">Ajouter</Link>
                </ul>
            </li>
            <li>
                <Link to="/Admin/User">Employé</Link>
                <ul className='d-flex flex-column'>
                    <Link to="/Admin/User/Index">Liste</Link>
                    <Link to="/Admin/User/Add">Ajouter</Link>
                </ul>
            </li>
            <li>
                <Link to="/Admin/Voitures">Voitures</Link>
                <ul className='d-flex flex-column'>
                    <Link to="/Admin/Voitures/Index">Liste</Link>
                    <Link to="/Admin/Voitures/Add">Ajouter</Link>
                </ul>
            </li>
            <li>
                <Link to="/Admin/Horaires">Horaires</Link>
                <ul className='d-flex flex-column'>
                    <Link to="/Admin/Horaires/Index">Liste</Link>
                    <Link to="/Admin/Horaires/Add">Ajouter</Link>
                </ul>
            </li>
            <li>
                <Link to="/Admin/Avis">Avis</Link>
                <ul className='d-flex flex-column'>
                    <Link to="/Admin/Avis/Index">Liste</Link>
                </ul>
            </li>
            <li>
                <Link to="/Admin/Contacts">Contacts</Link>
                <ul className='d-flex flex-column'>
                    <Link to="/Admin/Contacts/Index">Liste</Link>
                </ul>
            </li>
        </ul>
    );
}


export { SlideMenu };
