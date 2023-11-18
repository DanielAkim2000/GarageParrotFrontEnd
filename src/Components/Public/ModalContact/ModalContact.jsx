import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { CarteInfo } from "../Card/CarteInfo";

function ModalContact(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [nom, setNom] = useState(null);
  const [prenom, setPrenom] = useState(null);
  const [email, setEmail] = useState(null);
  const [tel, setTel] = useState(null);
  const [sujet, setSujet] = useState(null);
  const [message, setMessage] = useState(null);
  const data = props.data;
  const [isImgVisible, setIsImgVisible] = useState(false);

  //comportement

  useEffect(() => {
    if (data) {
      setIsImgVisible(true);
    }
  }, [data, isImgVisible]);
  const addContact = (e) => {
    e.preventDefault();
    console.log({
      nom: nom,
      prenom: prenom,
      email: email,
      numero_telephone: tel,
      message: message,
      sujet: sujet,
    });
    axios
      .post("http://localhost:8000/api/endpointcontact", {
        nom: nom,
        prenom: prenom,
        email: email,
        numero_telephone: tel,
        message: message,
        sujet: isImgVisible ? data.marque + " " + data.modele : sujet,
        dataId: data ? data.id : null,
      })
      .then((response) => {
        console.log(response);
        alert(response.data.message);
        setNom(null);
        setPrenom(null);
        setEmail(null);
        setTel(null);
        setSujet(null);
        setMessage(null);
        handleClose();
      })
      .catch((error) => {
        if (error.response) {
          // la requête a été faite et le code de réponse du serveur n’est pas dans
          // la plage 2xx
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
        } else if (error.request) {
          // la requête a été faite mais aucune réponse n’a été reçue
          // `error.request` est une instance de XMLHttpRequest dans le navigateur
          // et une instance de http.ClientRequest avec node.js
          console.log(error.request);
        } else {
          // quelque chose s’est passé lors de la construction de la requête et cela
          // a provoqué une erreur
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };
  return (
    <>
      <Button className="m-2" variant="primary" onClick={handleShow}>
        Contact
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Formulaire de contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-row justify-content-center align-items-center">
            <div>
              <Form>
                <Form.Group>
                  <Form.Label style={{ gridArea: "label1" }} htmlFor="nom">
                    Nom:
                  </Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setNom(e.target.value);
                    }}
                    type="text"
                    name="nom"
                    id="nom"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label style={{ gridArea: "label2" }} htmlFor="prenom">
                    Prenom:
                  </Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setPrenom(e.target.value);
                    }}
                    type="text"
                    name="prenom"
                    id="prenom"
                  />
                  <Form.Label style={{ gridArea: "label3" }} htmlFor="email">
                    Email:
                  </Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    type="email"
                    name="email"
                    id="email"
                  />
                  <Form.Label style={{ gridArea: "label4" }} htmlFor="tel">
                    Tel:
                  </Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setTel(e.target.value);
                    }}
                    type="tel"
                    name="tel"
                    id="tel"
                  />
                  <Form.Label style={{ gridArea: "label5" }} htmlFor="sujet">
                    Sujet:
                  </Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setSujet(e.target.value);
                    }}
                    type="text"
                    name="sujet"
                    id="sujet"
                    defaultValue={
                      isImgVisible ? data.marque + " " + data.modele : ""
                    }
                  />
                  <Form.Label style={{ gridArea: "label6" }} htmlFor="message">
                    Message:
                  </Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    name="message"
                    id="message"
                    as="textarea"
                  />
                </Form.Group>
              </Form>
            </div>
            {isImgVisible ? (
              <div className="d-flex w-75 flex-start">
                <CarteInfo data={data} width={250} />
              </div>
            ) : (
              <></>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermez
          </Button>
          <Button variant="primary" onClick={addContact}>
            Envoyez
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export { ModalContact };
