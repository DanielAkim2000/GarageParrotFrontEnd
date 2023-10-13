import ScrollBar from '../Components/ScrollBar/ScrollBar.jsx';
import { useEffect,useState } from 'react';
import axios from 'axios';
import Header from '../Components/Header/Header.jsx';
import styled from 'styled-components';
import Footer from '../Components/Footer/Footer.jsx'

const Main = styled.main`
    margin-top: 120px;
`
export function Home(){
    //state (états/données)
    const [services,setServices] = useState(
        [
            {}
        ]
    );
    const [voitures,setVoitures] = useState(
        [
            {}
        ]
    );
    const [temoignages,setTemoignages] = useState(
        [
            {}
        ]
    );
    const [horaires,setHoraires] = useState(
        [
            {}
        ]
    );

    // Requete Axios
    useEffect(()=>{
        axios.get('http://localhost:8000/api/services')
            .then(response => {
                setServices( response.data.services );
            })
            .catch(error => {
                console.error(error);
            });
    },[])
    useEffect(()=>{
        axios.get('http://localhost:8000/api/voitures')
            .then(response => {
                setVoitures( response.data.voituresoccasions );
            })
            .catch(error => {
                console.error(error);
            });
    },[])
    useEffect(()=>{
        axios.get('http://localhost:8000/api/temoignages')
            .then(response => {
                setTemoignages( response.data.temoignages );
            })
            .catch(error => {
                console.error(error);
            });
    },[])
    useEffect(()=>{
        axios.get('http://localhost:8000/api/horaires')
            .then(response => {
                setHoraires( response.data.horairesouvertures );
            })
            .catch(error => {
                console.error(error);
            });
    },[])
    return <>
           <Header/>
            <Main>
                <ScrollBar element='image' auto={true} centerMode={false} data={services}/>
                    <div className='d-flex flex-column justify-content-center container-fluid'>
                        <button className='btn btn-primary m-3'>Acheter une voiture</button>
                        <button className='btn btn-primary m-3'>Vendre votre voiture</button>
                    </div>
                    <div className='text-center'>
                        <p>Title</p>
                        <p>Phrase reference</p>
                        <ScrollBar element='card' auto={true} centerMode={true} data={voitures} />
                    </div>
                    <div style={{textAlign:'center'}} >
                        <h2>Les avis de nos client</h2>
                        <ScrollBar element='cardTemoignages' auto={false} centerMode={true} data={temoignages} />
                        <button>Voir Tous les avis</button>
                    </div>
                    <div style={{textAlign:'center'}} >
                        <h2>Nos different Services</h2>
                        <ScrollBar element='cardServices' auto={false} centerMode={true} data={services} />
                        <button>Voir Tous les Services</button>
                    </div>
                    <div className='text-center'>
                        Presentation
                    </div>
            </Main>
            <Footer data={horaires}/>
        </>
  }