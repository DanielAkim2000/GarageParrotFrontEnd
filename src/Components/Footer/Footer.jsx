import styled,{ css } from 'styled-components'
import React, { useEffect,useState } from 'react';
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

export default function Footer(props){
    // données
    let horaires = props.data;

    return(
        <CustomFooter>
            <div className='horaires'>
                {(horaires && horaires.map((horaire) => (
                    <ul> 
                        <li key={horaire.id}>
                            <p>{ horaire.jourSemaine && horaire.jourSemaine.id }: {horaire.heureOuverture} - {horaire.heureFermeture}</p>
                        </li> 
                    </ul>        
                )))}
            </div>
            <div>
                
            </div>
            <div>

            </div>
        </CustomFooter>
    )
}