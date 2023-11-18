import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useLocation } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { ModalContact } from "../../Components/Public";
const ServiceShow = () => {
  const location = useLocation();
  const service = location.state.data;
  return (
    <div className="d-flex flex-row justify-content-center align-items-center w-100 flex-wrap">
      <Card
        style={{ minHeight: "100px", minWidth: "200px" }}
        className="bg-dark text-white m-3 w-25 h-25 w-sm-100 h-sm-100"
      >
        <Card.Img
          className="w-100 h-100"
          src={service.image}
          alt="Card image"
        />
        <Card.ImgOverlay>
          <Card.Title>{service.nom}</Card.Title>
        </Card.ImgOverlay>
      </Card>
      <ListGroup className="m-3">
        <ListGroup.Item>Nom du service: {service.nom}</ListGroup.Item>
        <ListGroup.Item>Description: {service.description}</ListGroup.Item>
        <ListGroup.Item>
          Plus de renseignement:
          <ModalContact />
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export { ServiceShow };
