import { Routes,Route } from "react-router-dom";
import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Error } from "../_utils/Error.jsx";
import { Home,Services,Voitures,NousContacter,Avis,Layout } from '../Pages/Public';

export default function PublicRouter () {
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

  
    return (
    <Routes>
        <Route element={<Layout horaires={horaires} />}>
            <Route index element={<Home voitures={voitures} services={services} temoignages={temoignages}  />} />

            <Route path="/Home" element={<Home voitures={voitures} services={services} temoignages={temoignages}  />} /> {/* 👈 Renders at /#/app/ */}
            <Route path="/Services" element={<Services services={services}  />} /> {/* 👈 Renders at /#/app/ */}
            <Route path="/Voitures" element={<Voitures voitures={voitures} />} /> {/* 👈 Renders at /#/app/ */}
            <Route path="/NousContacter" element={<NousContacter />} /> {/* 👈 Renders at /#/app/ */}
            <Route path="/Avis" element={<Avis />} /> {/* 👈 Renders at /#/app/ */}
            <Route path='*' element={<Error />} />
        </Route>
        
    </Routes>  
    )
}
