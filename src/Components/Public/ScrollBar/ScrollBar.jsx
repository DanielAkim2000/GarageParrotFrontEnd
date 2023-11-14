// src/components/MyComponent.js
import React from "react";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  Carte,
  CardServices,
  CardTemoignages,
} from "../../../Components/Public";

// styles components
const Container = styled.div`
  width: 100%;

  position: relative;
  justify-content: center;
  align-items: center;
  white-space: nowrap; /* Empêche le texte de revenir à la ligne */
  &:first-child {
    padding: auto;
    width: 100%;
    margin: 0;
  }
`;
const DataImage = styled.img`
  width: 100vw;
  height: 230px;

  @media screen and (min-width: 1100px) {
    height: 400px;
  }
`;

const TitleData = styled.p`
  position: absolute;
  top: 0;
  left: 0;
  color: aquamarine;
  text-align: center;
  font-size: 1.3rem;
  background: rgba(0, 0, 0, 0.7);
  color: white; /* Couleur du texte */
  padding: 1px;
`;

//return une liste d'image
export function ListImages(props) {
  let data = props.datas;
  return (
    <div key={props.id}>
      <TitleData>{data.nom}</TitleData>
      <DataImage src={data.image} />
    </div>
  );
}
//return une liste de carte
function ListCards(props) {
  let data = props.datas;
  let width = props.width;
  return <Carte key={props.id} data={data} width={width} />;
}

function ListCardsTemoignages(props) {
  let data = props.datas;
  let width = props.width;
  return <CardTemoignages key={props.id} data={data} width={width} />;
}

function ListCardsServices(props) {
  let data = props.datas;
  let width = props.width;
  return <CardServices key={props.id} data={data} width={width} />;
}

const ScrollBar = (props) => {
  // (etats ou donnees)
  let datas = props.data;

  let element = props.element;

  let auto = props.auto;

  let centerMode = props.centerMode;
  // affichage(render)
  return (
    <Container>
      <Carousel
        autoPlay={auto}
        infiniteLoop
        centerMode={centerMode}
        showThumbs={false}
        interval={2500}
      >
        {datas &&
          datas.map((data) => (
            <div>
              <div key={data.id}>
                {element === "card" && (
                  <ListCards id={data.id} datas={data} width={220} />
                )}
              </div>
              <div>
                {element === "image" && (
                  <ListImages id={data.id} datas={data} />
                )}
              </div>
              <div>
                {element === "cardTemoignages" && (
                  <ListCardsTemoignages id={data.id} width={220} datas={data} />
                )}
              </div>
              <div className="test">
                {element === "cardServices" && (
                  <ListCardsServices
                    className="test"
                    id={data.id}
                    width={220}
                    datas={data}
                  />
                )}
              </div>
            </div>
          ))}
      </Carousel>
    </Container>
  );
};

export { ScrollBar };
