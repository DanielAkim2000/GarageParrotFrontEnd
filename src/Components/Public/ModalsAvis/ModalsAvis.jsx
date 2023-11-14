import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "../../../Api/axios.jsx";
const ModalsAvis = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [nom, setNom] = useState("");
  const [commentaire, setCommentaire] = useState("");
  const [note, setNote] = useState();

  const addAvis = (e) => {
    e.preventDefault();
    axios
      .post("/api/endpointavis", {
        nom: nom,
        commentaire: commentaire,
        note: note,
      })
      .then((response) => {
        console.log(response);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Button variant="primary" className="m-2" onClick={handleShow}>
        Laissez votre avis
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Formulaire d'avis</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nom:</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setNom(e.target.value);
                }}
                type="text"
                placeholder="Nom"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Commentaire:</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setCommentaire(e.target.value);
                }}
                as="textarea"
                placeholder="Commentaire"
                rows={3}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Note:</Form.Label>
              <div className="w-50">
                <Form.Range
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                  max={5}
                  min={0}
                />
                <p id="note-display">La note actuelle est : {note}</p>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button variant="primary" onClick={addAvis}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { ModalsAvis };
