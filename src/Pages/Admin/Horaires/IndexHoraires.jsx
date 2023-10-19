import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';

const IndexHoraires = () => {
       // state (etats,donees)
       const [horaires,setHoraires] = useState([
        {}
    ]);
    const [loading,setLoading] = useState(true);
    //comportement 
    
    useEffect(() => {
        setLoading(true)
        axios.get('http://localhost:8000/api/horaires')
            .then((response)=>{
                setHoraires(response.data.horairesouvertures );
                console.log(response.data.horairesouvertures);
                setLoading(false);
            })
            .catch((error) =>{
                console.log(error);
            })
    },[])
    
    return (
        <table className='table'>
            <thead>
                    <tr>
                        <th scope="col">Jour</th>
                        <th scope="col">Heure d'ouverture</th>
                        <th scope="col">Heure de fermeture</th>
                        <th scope="col">Actions</th>
                    </tr>
            </thead>
            <tbody>
            {loading? (
            <tr>
                <td colSpan="6">Loading...</td>
            </tr>)
            : horaires? (
                horaires.map((horaire) => (
                    <tr key={horaire.id}>
                        <th scope="row">{horaire.jourSemaine.id}</th>
                        <td>{horaire.heureOuverture}</td>
                        <td>{horaire.heureFermeture}</td>
                        <td>
                            <button >Modifier</button>
                            <button>Supprimer</button>
                        </td>
                    </tr>
                    
                ) ) )
                : 
                (
                <tr>
                    <td colSpan="6">Error</td>
                </tr>
                )
            
            }
            </tbody>
        </table>
        );
}


export { IndexHoraires } ;
