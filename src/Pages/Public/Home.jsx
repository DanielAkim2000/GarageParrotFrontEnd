import { CardServices, CardTemoignages, Carte, ScrollBar } from '../../Components/Public';
import { Link } from 'react-router-dom';

export function Home(props){
    // (états/données)
    let services = [...props.services];
    let voitures = [...props.voitures];
    let temoignages = [...props.temoignages];

    return (
            <>
                <ScrollBar element='image' auto={true} centerMode={false} data={services.reverse().slice(0,2)}/>
                    <div className='d-flex flex-column justify-content-center container-fluid'>
                        <button className='btn btn-primary m-3'><Link to="/Voitures">Acheter une voiture</Link></button>
                    </div>
                    <div className='text-center justify-content-center align-items-center w-100'>
                        <p>Title</p>
                        <p>Phrase reference</p>
                        <div className='d-flex flex-row flex-wrap justify-content-center align-items-center'>
                        {voitures? voitures.reverse().slice(0,10).map((voiture)=>(
                        
                            <Carte key={voiture.id} data={voiture} width={200}/>
    
                        ))
                        : <>Error</>}
                        </div>
                    </div>
                    <div className='w-100' style={{textAlign:'center'}} >
                        <h2>Les avis de nos client</h2>
                        <div className='d-flex flex-row flex-wrap justify-content-center align-items-center'>
                        {temoignages? temoignages.reverse().slice(0,10).map((temoignage)=>(
                        
                            <CardTemoignages key={temoignage.id} data={temoignage} width={200}/>
    
                        ))
                        : <>Error</>}
                        </div>
                        <button>Voir tous les avis</button>
                        <button>Laisser votre avis</button>
                    </div>
                    <div className='w-100' style={{textAlign:'center'}} >
                        <h2>Nos different Services</h2>
                        <div className='d-flex flex-row flex-wrap justify-content-center align-items-center'>
                        {services? services.reverse().slice(0,10).map((service)=>(
                        
                            <CardServices key={service.id} data={service} width={200}/>
    
                        ))
                        : <>Error</>}
                        </div>
                        <button><a  href="/Services">Voir tous les services</a></button>
                    </div>
                    <div className='text-center'>
                        Presentation
                    </div>
            </>
    )
  }