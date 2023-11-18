import { useState } from "react";
import { Carte, Paginator } from "../../Components/Public";
import Form from "react-bootstrap/Form";
import axios from "../../Api/axios.jsx";
import InputGroup from "react-bootstrap/InputGroup";
import "./style.css"

const Voitures = (props) => {
  let voitures = props.voitures;

  // donnee pour les paginator
  let nombreElementPages = 8;
  const [debut, setDebut] = useState(0);
  const [fin, setFin] = useState(nombreElementPages);
  let dataMap = voitures.slice(debut, fin);
  let [kilometrage, setKilometrage] = useState(0);
  let [annee, setAnnee] = useState(0);
  let [prix, setPrix] = useState(0);

  const [newDataMap, setNewDataMap] = useState(null);

  // filtre dinamique
  const filtre = () => {
    axios
      .post("/filtreVoiture", {
        kilometrage,
        annee,
        prix,
      })
      .then((response) => {
        setNewDataMap(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  newDataMap
    ? (dataMap = newDataMap.slice(debut, fin))
    : voitures.slice(debut, fin);
  console.log(dataMap.length);

  //Comportements
  const changePage = (e) => {
    // Element suivant
    if (
      e.target.getAttribute("data-testid") === "NavigateNextIcon" ||
      e.target.getAttribute("d") ===
        "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" ||
      e.target.getAttribute("aria-label") === "Go to next page"
    ) {
      let newDebut = debut + nombreElementPages;
      let newFin = newDebut + nombreElementPages;
      if (newDebut >= 0) {
        setDebut(newDebut);
        setFin(newFin);
      }
    }
    // Element precedent
    if (
      e.target.getAttribute("data-testid") === "NavigateBeforeIcon" ||
      e.target.getAttribute("d") ===
        "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" ||
      e.target.getAttribute("aria-label") === "Go to previous page"
    ) {
      let newDebut = debut - nombreElementPages;
      let newFin = newDebut + nombreElementPages;
      if (newDebut <= voitures.length) setDebut(newDebut);
      setFin(newFin);
    }
    // Element nombre
    if (!isNaN(parseInt(e.target.textContent))) {
      const newDebut =
        (parseInt(e.target.textContent) - 1) * nombreElementPages;
      const newFin = newDebut + nombreElementPages;
      setDebut(newDebut);
      setFin(newFin);
    }
  };

  return (
    <>
      <div>
        <Form>
          <Form.Group className="d-flex flex-row flex-wrap w-100 justify-content-center align-items-center">
            <Form.Label style={{width:"20%"}} >Kilométrage:</Form.Label>
            <Form.Range
              className="m-3 w-50"
              defaultValue={kilometrage}
              min={0}
              max={500000}
              step={10000}
              onChange={(e) => {
                setKilometrage(e.target.value);
                filtre();
              }}
            ></Form.Range>
            <InputGroup style={{width:"20%"}} size="sm" className="mesure">
              <InputGroup.Text id="inputGroup-sizing-sm mesure">Km</InputGroup.Text>
              <Form.Control
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                value={kilometrage+"Km"}
                disabled
              />
            </InputGroup>
            <Form.Label style={{width:"20%"}} >Prix:</Form.Label>
            <Form.Range
              className="m-3 w-50"
              defaultValue={prix}
              min={0}
              max={100000}
              step={1000}
              onChange={(e) => {
                setPrix(e.target.value);
                filtre();
              }}
            ></Form.Range>
            <InputGroup style={{width:"20%"}} size="sm" className="mesure">
              <InputGroup.Text id="inputGroup-sizing-sm mesure">€:</InputGroup.Text>
              <Form.Control
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                value={prix+"€"}
                disabled
              />
            </InputGroup>
            <Form.Label style={{width:"20%"}} >Année:</Form.Label>
            <Form.Range
              className="m-3 w-50"
              defaultValue={annee}
              min={1998}
              max={2023}
              onChange={(e) => {
                setAnnee(e.target.value);
                console.log(e.target.value);
                filtre();
              }}
            ></Form.Range>
            <InputGroup style={{width:"20%"}} size="sm" className="mesure">
              <InputGroup.Text id="inputGroup-sizing-sm mesure">Y:</InputGroup.Text>
              <Form.Control
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                value={annee}
                disabled
              />
            </InputGroup>
          </Form.Group>
        </Form>
      </div>
      <div className="m-auto d-flex flex-row flex-wrap justify-content-center">
        {dataMap.length ? (
          dataMap.map((voiture) => (
            <Carte key={voiture.id} data={voiture} width={250} />
          ))
        ) : (
          <>Recherche introuvable</>
        )}
      </div>
      <Paginator
        data={newDataMap ? newDataMap : voitures}
        nombreElementPages={nombreElementPages}
        changePage={changePage}
      />
    </>
  );
};

export { Voitures };
