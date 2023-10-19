import { useState } from 'react';
import { Carte,Paginator } from '../../Components/Public';


const Voitures = (props) => {
    let voitures = props.voitures;

    // donnee pour les paginator
    let nombreElementPages = 1;
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
    
    return(
            <>
                <div>
                    
                </div>
                <div className='m-auto'>
                {dataMap && dataMap.map((voiture)=>(
                    <Carte key={voiture.id} data={voiture} width={200}/>
                    )
                    )}
                </div>
                <Paginator  data={voitures} nombreElementPages={nombreElementPages} changePage={changePage}/>
            </>
    )
}

export { Voitures };