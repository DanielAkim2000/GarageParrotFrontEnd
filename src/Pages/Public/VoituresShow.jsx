import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useLocation } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { ModalContact } from "../../Components/Public";

const VoituresShow = () => {
  const location = useLocation();
  const voiture = location.state.voiture;
  return (
    <div className="d-flex flex-row justify-content-center align-items-center w-100 flex-wrap">
      <Card
        style={{ minHeight: "100px", minWidth: "200px" }}
        className="bg-dark text-white m-3 w-25 h-25 w-sm-100 h-sm-100"
      >
        <Card.Img
          className="w-100 h-100"
          src={voiture.image}
          alt="Card image"
        />
        <Card.ImgOverlay>
          <Card.Title>{voiture.marque + " " + voiture.modele}</Card.Title>
          <Card.Text>Voiture {voiture.description}</Card.Text>
          <Card.Text>{voiture.annee_mise_en_circulation}</Card.Text>
        </Card.ImgOverlay>
      </Card>
      <ListGroup className="m-3">
        <ListGroup.Item>Marque: {voiture.marque}</ListGroup.Item>
        <ListGroup.Item>Modele: {voiture.modele}</ListGroup.Item>
        <ListGroup.Item>Prix: {voiture.prix}€</ListGroup.Item>
        <ListGroup.Item>Essence/Diesel: {voiture.description}</ListGroup.Item>
        <ListGroup.Item>
          Année: {voiture.annee_mise_en_circulation}
        </ListGroup.Item>
        <ListGroup.Item>Kilométrage: {voiture.kilometrage}Km</ListGroup.Item>
        <ListGroup.Item>
          <ModalContact data={voiture} />
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export { VoituresShow };
