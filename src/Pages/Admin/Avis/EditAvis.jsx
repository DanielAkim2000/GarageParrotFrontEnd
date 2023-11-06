import React from "react";
import Form from "react-bootstrap/Form";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";

const EditAvis = () => {
  const location = useLocation();
  const avis = location.state.avis;
  const [newavis, setNewavis] = useState({
    ...avis,
  });
  console.log(newavis);
  return (
    <Form.Group className="mb-3">
      <Form.Label>Nom:</Form.Label>
      <Form.Control
        className="w-50"
        placeholder={newavis.nom}
        onChange={(event) => {
          setNewavis({
            ...newavis,
            nom: event.target.value,
          });
          console.log(newavis);
        }}
      />
      <Form.Label>Note:</Form.Label>
      <Form.Control className="w-50" placeholder={newavis.note} disabled />
      <Form.Label>Commentaire:</Form.Label>
      <Form.Control
        className="w-50"
        placeholder={newavis.commentaire}
        disabled
      />
      <Form.Label>Approuvé:</Form.Label>
      <Form.Check
        type="switch"
        id="custom-switch"
        onChange={(event) => {
          setNewavis({
            ...newavis,
            modere: !newavis.modere,
          });
        }}
        checked={newavis.modere}
      />
      <Button>Enregistrer</Button>
    </Form.Group>
  );
};

export { EditAvis };
