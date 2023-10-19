import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Paginator } from '../../../Components/Public';

const IndexUser = () => {
    // state (etats,donees)
    const [users,setUsers] = useState([
        {}
    ]);
    const [loading,setLoading] = useState(true);
    
    // donnee pour les paginator
    let nombreElementPages = 5;
    const [debut,setDebut] = useState(0);
    const [fin,setFin] = useState(nombreElementPages);
    let dataMap = users.slice(debut,fin);

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
            if(newDebut <= users.length)
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
        axios.get('http://localhost:8000/api/employes')
            .then((response)=>{
                setUsers(response.data.utilisateurs);
                console.log(response.data.utilisateurs)
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
                        <th scope="col">Prenom</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Email</th>
                        <th scope="col">Mot de Passe</th>
                        <th scope="col">Actions</th>
                    </tr>
            </thead>
            <tbody>
            {loading? (
            <tr>
                <td colSpan="6">Loading...</td>
            </tr>)
            : dataMap? (
                dataMap.map((user) => (
                    <tr key={user.id}>
                        <th scope="row">{user.id}</th>
                        <td>{user.firstname}</td>
                        <td>{user.lastname}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
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
        <Paginator  data={users} nombreElementPages={nombreElementPages} changePage={changePage}/>
    </>
        );
}

export { IndexUser };
