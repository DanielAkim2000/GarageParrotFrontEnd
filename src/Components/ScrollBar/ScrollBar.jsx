// src/components/MyComponent.js
import React, { useEffect, useState,useRef } from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Carte from '../Card/Carte.jsx'
import CardTemoignages from '../Temoignages/CardTemoignages.jsx';
import CardServices from '../Card/CardServices.jsx';


// styles components

const ImagesData = styled.img`
    width:100%;
`
const Container = styled.div`
    width:100%;
    height:30%;
    position: relative;
    padding:0;
    white-space: nowrap; /* Empêche le texte de revenir à la ligne */
    &:first-child{
        padding:0;
        width:100%;
        margin:0;
    }
`
const DataImage = styled.img`
    width: 100vw;
    height:230px;
    
`

const TitleData = styled.p`
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
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: row;

    white-space: nowrap;
    li {
        position:relative; /* Place les éléments de liste côte à côte */
    }
`

//return une liste d'image
function ListImages(props){
    let data = props.datas
    return  <div>
                <TitleData>{data.nom}</TitleData>
                <DataImage src={data.image} />
            </div>
}
//return une liste de carte
function ListCards(props){
    let data = props.datas
    let width = props.width
    return <Carte data={data} width={width} />
}

function ListCardsTemoignages(props){
    let data = props.datas
    let width = props.width
    return <CardTemoignages data={data} width={width} />
}

function ListCardsServices(props){
    let data = props.datas
    let width = props.width
    return <CardServices data={data} width={width} />
}

export default function ScrollBar(props){
    // (etats ou donnees)
    let datas = props.data;

    let element = props.element;

    let auto = props.auto;

    let centerMode = props.centerMode;
    // affichage(render)
    return(
        <Container>
            <Carousel autoPlay={auto} infiniteLoop centerMode={centerMode} showThumbs={false} interval={2500}>
                {datas && datas.map((data) => (
                    <div>
                        <div>
                            {(element == 'card') && (
                                <ListCards key={data.id} datas={data} width={220} />
                            )}
                        </div>
                        <div>
                        {(element == 'image') &&
                        (
                            <ListImages key={data.id} datas={data} />
                        )}
                        </div>
                        <div>
                            {(element == 'cardTemoignages') &&
                            (
                                <ListCardsTemoignages key={data.id} width={220} datas={data} />
                            )}
                        </div>
                        <div className='test'> 
                            {(element == 'cardServices') &&
                            (
                                <ListCardsServices className='test' key={data.id} width={220} datas={data} />
                            )}
                        </div>
                    </div>
                ))}
            </Carousel>
        </Container>
    );
}



