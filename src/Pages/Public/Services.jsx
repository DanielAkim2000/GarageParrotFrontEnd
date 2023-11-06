import Card from 'react-bootstrap/Card'
import { ScrollBar,Paginator } from '../../Components/Public';
import { useState } from 'react';


const Services = (props) =>{
    // (etats et donnees)
    let services = props.services;
    let temoignages = props.temoignages;
    // data pour le paginator
    let nombreElementPages = 2;
    const [debut,setDebut] = useState(0);
    const [fin,setFin] = useState(nombreElementPages);
    let dataMap =services.slice(debut,fin);

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
    
    return(
            <>
                <div className='d-flex flex-row flex-wrap justify-content-center'>
                { (dataMap) && dataMap.map((service) => (
                <div className='m-2 '>
                <Card className="bg-white text-white w-75">
                    <Card.Img style={{height:'20rem',width : '40rem'}} src={service.image} alt="Card image" />
                    <Card.ImgOverlay>
                     <Card.Title>{service.nom}</Card.Title>
                    </Card.ImgOverlay>
                </Card>
                <a href="/Service">En savoir plus</a>
                </div>
                ))}
                </div>       
                <div className=''>
                    <div style={{textAlign:'center'}} >
                        <h2>Les avis de nos client</h2>
                        <ScrollBar element='cardTemoignages' auto={false} centerMode={true} data={temoignages} />
                        <button>Voir tous les avis</button>
                        <button>Laisser votre avis</button>
                    </div>
                </div>
                <Paginator  data={services} nombreElementPages={nombreElementPages} changePage={changePage}/>
            </>
    )
}
export { Services };
