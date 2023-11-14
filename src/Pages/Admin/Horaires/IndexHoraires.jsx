import React from "react";
import { useState, useEffect } from "react";
import axios from "../../../Api/axios.jsx";
import { Loading } from "../../../Components/Public";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button.js";
import "../style.css";

const JoursSemaine = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

const IndexHoraires = () => {
  // state (etats,donees)
  const [horaires, setHoraires] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  //comportement

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/horairesAdmin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setHoraires(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reload]);

  const goModify = (horaire) => {
    navigate("/Admin/Horaires/Edit", { state: { horaires: horaire } });
  };

  const deleteHoraire = (horaire) => {
    const response = window.confirm("Voulez-vous continuer ?");
    if (response) {
      axios
        .delete(`/api/deleteHoraire/${horaire.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          setReload(!reload);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const horairesTries = horaires.sort(
    (a, b) =>
      JoursSemaine.indexOf(a.jour_semaine) -
      JoursSemaine.indexOf(b.jour_semaine)
  );

  return (
    <div className="table-responsive ">
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col">Jour</th>
            <th scope="col">Heure d'ouverture</th>
            <th scope="col">Heure de fermeture</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6">
                <Loading />
              </td>
            </tr>
          ) : horaires ? (
            horairesTries.map((horaire) => (
              <tr key={horaire.id}>
                <th scope="row">{horaire.jour_semaine}</th>
                <td>{horaire.heure_ouverture}</td>
                <td>{horaire.heure_fermeture}</td>
                <td>
                  <Button
                    className="m-1"
                    onClick={() => {
                      goModify(horaire);
                    }}
                  >
                    Modifier
                  </Button>
                  <Button
                    className="m-1"
                    onClick={() => {
                      deleteHoraire(horaire);
                    }}
                  >
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Error</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export { IndexHoraires };
