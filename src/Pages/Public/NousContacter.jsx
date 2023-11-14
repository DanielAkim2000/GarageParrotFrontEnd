import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";

const NousContacter = (props) => {
  // state (donnees et etats)
  const [nom, setNom] = useState(null);
  const [prenom, setPrenom] = useState(null);
  const [email, setEmail] = useState(null);
  const [tel, setTel] = useState(null);
  const [sujet, setSujet] = useState(null);
  const [message, setMessage] = useState(null);
  const location = useLocation();
  const data = location.state;
  const [isImgVisible, setIsImgVisible] = useState(false);

  console.log(location.state);

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
        sujet: sujet,
        dataId: data.id,
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
              defaultValue={isImgVisible ? data.marque + " " + data.modele : ""}
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
          <Button className="mt-3 mb-3" onClick={addContact}>
            Envoyer
          </Button>
        </Form>
      </div>
      <div>
        {isImgVisible ? (
          <Card className="bg-white shadow text-white w-75 m-3">
            <Card.Img src={data.image} alt="Card image" />
            <Card.ImgOverlay>
              <Card.Title>{data.marque + " " + data.modele}</Card.Title>
              <Card.Text>C'est une voiture {data.description}</Card.Text>
              <Card.Text color="blue">{data.prix}€</Card.Text>
            </Card.ImgOverlay>
          </Card>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export { NousContacter };
