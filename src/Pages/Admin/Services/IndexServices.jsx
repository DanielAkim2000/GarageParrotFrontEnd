import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Paginator } from '../../../Components/Public';

const IndexServices = () => {
       // state (etats,donees)
       const [services,setservices] = useState([
        {}
    ]);
    const [loading,setLoading] = useState(true);
    
    // donnee pour les paginator
    let nombreElementPages = 5;
    const [debut,setDebut] = useState(0);
    const [fin,setFin] = useState(nombreElementPages);
    let dataMap = services.slice(debut,fin);

    //Comportements
    const changePage = (e) => {
        // Element suivant
        if(e.target.getAttribute('data-testid') === "NavigateNextIcon" 
        || e.target.getAttribute('d') === "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
        || e.target.getAttribute('aria-label')=== "Go to next page"){
            let newDebut = debut + nombreElementPages;
            let newFin = newDebut + nombreElementPages;
            if(newDebut >=0 ){
                setDebut(newDebut)
                setFin(newFin)
            }
            
        }
        // Element precedent
        if(e.target.getAttribute('data-testid') === "NavigateBeforeIcon" 
        || e.target.getAttribute('d') === "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" 
        || e.target.getAttribute('aria-label')=== "Go to previous page"){
            let newDebut = debut - nombreElementPages;
            let newFin = newDebut + nombreElementPages; 
            if(newDebut <= services.length)
            setDebut(newDebut)
            setFin(newFin)
        }
        // Element nombre 
        if(!isNaN(parseInt(e.target.textContent))){
            const newDebut = (parseInt(e.target.textContent) - 1) * nombreElementPages;
            const newFin = newDebut + nombreElementPages
            setDebut(newDebut);
            setFin(newFin);
        }
    }

    useEffect(() => {
        setLoading(true)
        axios.get('http://localhost:8000/api/services')
            .then((response)=>{
                setservices(response.data.services);
                console.log(response.data.services);
                setLoading(false);
            })
            .catch((error) =>{
                console.log(error);
            })
    },[])
    
    return (
    <>
        <table className='table'>
            <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Description</th>
                        <th scope="col">Image</th>
                        <th scope="col">Actions</th>
                    </tr>
            </thead>
            <tbody>
            {loading? (
            <tr>
                <td colSpan="6">Loading...</td>
            </tr>)
            : dataMap? (
                dataMap.map((service) => (
                    <tr key={service.id}>
                        <th scope="row">{service.id}</th>
                        <td>{service.nom}</td>
                        <td>{service.description}</td>
                        <td><img src={'/'+service.image} alt={service.nom} className='w-50 h-25' /></td>
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
        <Paginator  data={services} nombreElementPages={nombreElementPages} changePage={changePage}/>
    </>
        );
}

export { IndexServices };