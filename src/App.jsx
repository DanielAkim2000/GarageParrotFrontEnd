import './App.css';
import styled from 'styled-components';
import { Routes,Route } from "react-router-dom";
import { Home } from './Pages/Home.jsx';
import { Services } from './Pages/Services.jsx';
import { Voitures } from './Pages/Voitures.jsx';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { NousContacter } from './Pages/NousContacter';
import Avis from './Pages/Avis';




const Container = styled.div`
  display: flex;
  flex-direction: column;
  `

function App() {
  // state (etats et donnees)
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


  // comportements
       
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
                let temoignages = response.data.temoignages
                let data = []
                temoignages.forEach((temoignage) => {
                    if(temoignage.modere){
                        data.push(temoignage) 
                    }
                })
                setTemoignages( data );
            })
            .catch(error => {
                console.error(error);
            });
    },[])
    useEffect(() =>{
        axios.get('http://localhost:8000/api/horaires')
            .then(response => {
                setHoraires( response.data.horairesouvertures );
            })
            .catch(error => {
                console.error(error);
            });
  },[])
  return(
    <Container>
      <Routes>
          <Route exact path="/" element={<Home voitures={voitures} services={services} temoignages={temoignages} horaires={horaires} />} /> {/* 👈 Renders at /#/app/ */}
          <Route path="/Services" element={<Services services={services} horaires={horaires} />} /> {/* 👈 Renders at /#/app/ */}
          <Route path="/Voitures" element={<Voitures voitures={voitures} horaires={horaires}/>} /> {/* 👈 Renders at /#/app/ */}
          <Route path="/NousContacter" element={<NousContacter horaires={horaires}/>} /> {/* 👈 Renders at /#/app/ */}
          <Route path="/Avis" element={<Avis horaires={horaires}/>} /> {/* 👈 Renders at /#/app/ */}
      </Routes>  
    </Container>
      
  )
    
}

export default App;
