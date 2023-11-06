import React from 'react';
import { useState,useEffect } from 'react';
import axios from '../../../Api/axios.jsx';
import { Loading, Paginator } from '../../../Components/Public';
import { useNavigate } from 'react-router-dom';

const IndexVoitures = () => {
    // state (etats,donees)
    const [voitures,setVoitures] = useState([
        {}
    ]);
    const [loading,setLoading] = useState(true);

    const token = localStorage.getItem("token");

    const navigate = useNavigate();
    
     // donnee pour les paginator
     let nombreElementPages = 5;
     const [debut,setDebut] = useState(0);
     const [fin,setFin] = useState(nombreElementPages);
     let dataMap = voitures.slice(debut,fin);
 
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
             if(newDebut <= voitures.length)
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
        axios.get('/api/voitures',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
            .then((response)=>{
                setVoitures(response.data);
                console.log(response.data);
            setLoading(false);
            })
            .catch((error) =>{
            console.log(error);
            })
    },[])

    const goModify = (voiture) => {
        navigate('/Admin/Voitures/Edit',{state:{ voitures : voiture}})
    }
    
    const deleteVoiture = (voiture) => {
        axios.delete(`/api/deleteVoiture/${voiture.id}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
            .then((response)=>{
                console.log(response)
            })
            .catch((error)=>{
                console.log(error)
            })
    }
    
    return (
        <>
            <table className='table'>
                <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Marque</th>
                            <th scope="col">Modele</th>
                            <th scope="col">Description</th>
                            <th scope="col">Kilometrage</th>
                            <th scope="col">Année de mise en circulation</th>
                            <th scope="col">Image</th>
                            <th scope="col">Actions</th>
                        </tr>
                </thead>
                <tbody>
                {loading? (
                <tr>
                    <td colSpan="6"><Loading/></td>
                </tr>)
                : dataMap? (
                    dataMap.map((voiture) => (
                        <tr key={voiture.id}>
                            <th scope="row">{voiture.id}</th>
                            <td>{voiture.marque}</td>
                            <td>{voiture.modele}</td>
                            <td>{voiture.description}</td>
                            <td>{voiture.kilometrage}</td>
                            <td>{voiture.annee_mise_en_circulation}</td>
                            <td><img src={voiture.image} alt={voiture.modele} className='img-fluid img-thumbnail' /></td>
                            <td>
                                <button onClick={()=>{goModify(voiture)}}>Modifier</button>
                                <button onClick={()=>{deleteVoiture(voiture)}} >Supprimer</button>
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
            <Paginator  data={voitures} nombreElementPages={nombreElementPages} changePage={changePage}/>
        </>
        );
}

export { IndexVoitures };
