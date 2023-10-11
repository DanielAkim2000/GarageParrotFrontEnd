// src/components/MyComponent.js
import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import '../../Styles/SlideBar.css';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


// styles components

const ImagesServices = styled.img`
    width:100%;
`
const ScrollBar = styled.div`
    width:100%;
    height: 30%;
    position: relative;
    padding:0;
    overflow: auto; /* Active les barres de défilement */
    /*white-space: nowrap; /* Empêche le texte de revenir à la ligne */
    &:first-child{
        padding:0;
        width:100%;
        margin:0;
    }
`
const SlideImage = styled.img`
    width: 100vw;
    height: 230px;
    
`

const TitleSlide = styled.p`
    position: absolute;
    top: 0;
    left: 0;
    color: aquamarine;
    text-align: center;
    font-size:1.3rem;
    background: rgba(0, 0, 0, 0.7);
    color: white; /* Couleur du texte */
    padding: 1px;
`
const LI = styled.li`
`

const UL = styled.ul`
    overflow: 'auto';
    list-style: none;
    padding: 0;
    display: inline-block;
    white-space: nowrap;
    li {
        position:relative; /* Place les éléments de liste côte à côte */
    }
`
export default function SlideBar(){
    // state (états et données)
    const [services,setServices] = useState(
        [
            {}
        ]
    );

    const caroussel = useRef(null);
    // comportements
    useEffect(()=>{
        axios.get('http://localhost:8002/api/services')
            .then(response => {
                setServices( response.data.services );
            })
            .catch(error => {
                console.error(error);
            });
    },[])

    const autoScroll = () => {
        const scrollAmount = 10; // Ajustez la vitesse de défilement
        caroussel.scrollLeft += scrollAmount;
    }

    useEffect(()=>{
        setInterval(() => {
            autoScroll()
        }, 500)});

    // affichage(render)
    return(
            <ScrollBar>
                <Carousel autoPlay infiniteLoop showThumbs={false}>
                    {(services)  && (services.map( (service) => (
                        <>
                            <UL ref={caroussel}>
                                <LI key={service.id}>
                                    <TitleSlide>{service.nom}</TitleSlide>
                                    <SlideImage src={`${service.image}`} />
                                </LI>
                            </UL>
                        </> 
                    )
                    )
                    )}
                </Carousel>
            </ScrollBar>
    );
}
