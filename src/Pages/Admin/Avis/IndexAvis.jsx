import React, { useEffect, useState } from 'react';
import axios from '../../../Api/axios.jsx';
import { Switch } from '../../../Components/Admin';
import { Paginator,Loading } from '../../../Components/Public';
import { useNavigate } from 'react-router-dom';

const IndexAvis = () => {
    // state (etats,donees)
    const [avis,setAvis] = useState([
        {}
    ]);
    const [loading,setLoading] = useState(true);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    
    // donnee pour les paginator
    let nombreElementPages = 5;
    const [debut,setDebut] = useState(0);
    const [fin,setFin] = useState(nombreElementPages);
    let dataMap = avis.slice(debut,fin);

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
            if(newDebut <= avis.length)
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
        axios.get('/api/temoignages',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
            .then((response)=>{
            setAvis(response.data);
            setLoading(false);
            })
            .catch((error) =>{
            console.log(error);
            })
    },[])
    const goModify = (avi) =>{
        navigate('/Admin/Avis/Edit',{state:{ avis : avi}})
    }
    return (
    <>
        <table className='table'>
            <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Commentaire</th>
                        <th scope="col">Note</th>
                        <th scope="col">Modere</th>
                        <th scope="col">Actions</th>
                    </tr>
            </thead>
            <tbody>
            {loading? (
            <tr>
                <td colSpan="6"><Loading/></td>
            </tr>)
            : dataMap? (
                dataMap.map((avi) => (
                    <tr key={avi.id}>
                        <th scope="row">{avi.id}</th>
                        <td>{avi.nom}</td>
                        <td>{avi.commentaire}</td>
                        <td>{avi.note}</td>
                        <td><Switch bool={avi.modere} /></td>
                        <td>
                            <button onClick={()=>{goModify(avi)}}>Modifier</button>
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
        <Paginator  data={avis} nombreElementPages={nombreElementPages} changePage={changePage}/>
    </>
    );

}

export { IndexAvis };
