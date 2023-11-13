import { useNavigate } from 'react-router-dom';
import { CardServices, CardTemoignages, CarrousellAkim, Carte, ModalAfficheAvis, ModalsAvis } from '../../Components/Public';
import './style.css'
import  Button from 'react-bootstrap/esm/Button';


export function Home(props){
    // (états/données)
    let services = [...props.services];
    let voitures = [...props.voitures];
    let temoignages = [...props.temoignages];
    const navigate = useNavigate();
    const goservices = () => {
        navigate('/Services');
    }
    return (
            <div className='bg-light w-100 '>
                <div className='w-100 h-50  d-flex justify-content-center m-auto align-items-center'>
                    <p>Phrase de Presentation</p>
                </div>
                <div className='w-100 h-50 d-flex flex-row justify-content-center align-items-stretch bg-light'>
                    <div className=' container-fluid d-flex flex-column justify-content-around align-items-stretch' style={{maxWidth:'1000px'}}>
                        <p className='align-self-center m-4'>Phrase reference pour les services</p>
                        <CarrousellAkim services={services} />
                        <p className='align-self-center m-4'>Nous sommes ..</p>
                    </div>
                </div>
                    <div className='d-flex flex-column justify-content-center container-fluid align-items-center'>
                        <p>Phrase pour les voitures</p>
                    </div>
                    <div className='text-center justify-content-center align-items-center w-100'>
                        <p>Title</p>
                        <p>Phrase reference</p>
                        <div className='d-flex flex-row flex-wrap justify-content-center align-items-center'>
                        {voitures? voitures.reverse().slice(0,10).map((voiture)=>(
                        
                            <Carte key={voiture.id} data={voiture} width={250}/>
    
                        ))
                        : <>Error</>}
                        </div>
                    </div>
                    <div className='w-100' style={{textAlign:'center'}} >
                        <h2>Les avis de nos client</h2>
                        <div className='d-flex flex-row flex-wrap justify-content-center align-items-center'>
                        {temoignages? temoignages.reverse().slice(0,5).map((temoignage)=>(
                        
                            <CardTemoignages key={temoignage.id} data={temoignage} width={200}/>
    
                        ))
                        : <>Error</>}
                        </div>
                        <ModalAfficheAvis data={temoignages} />
                        <ModalsAvis />
                    </div>
                    <div className='w-100' style={{textAlign:'center'}} >
                        <h2>Nos different Services</h2>
                        <div className='d-flex flex-row flex-wrap justify-content-center align-items-center'>
                        {services? services.reverse().slice(0,10).map((service)=>(
                        
                            <CardServices key={service.id} data={service} width={200}/>
    
                        ))
                        : <>Error</>}
                        </div>
                        <Button onClick={goservices}>Voir tous les services</Button>
                    </div>
                    <div className='text-center'>
                        Presentation
                    </div>
            </div>
    )
  }