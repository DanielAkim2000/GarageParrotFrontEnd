import styled from 'styled-components'
import React from 'react';
import './Footer.css';

const CustomFooter = styled.footer`
    display: grid;
    grid-area-templates: 
        " horaires "
        " options "
        " basdepage "
    ;
    place-items: center;
    background-color: black;
    color: white;
`

const Footer = (props) => {
    // données
    let horaires = props.data;

    return(
        <CustomFooter>
            <div className='horaires'>
                {(horaires && horaires.map((horaire) => (
                    <ul> 
                        <li key={horaire.id}>
                            <p key={horaire.jour_semaine}>{ horaire.jour_semaine}: {horaire.heure_ouverture} - {horaire.heure_fermeture}</p>
                        </li> 
                    </ul>        
                )))}
            </div>
            <div>
                Options
            </div>
            <div>

            </div>
        </CustomFooter>
    )
}

export { Footer };