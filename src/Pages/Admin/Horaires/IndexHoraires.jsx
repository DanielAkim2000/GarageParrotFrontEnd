import React from "react";
import { useState, useEffect } from "react";
import axios from "../../../Api/axios.jsx";
import { Loading } from "../../../Components/Public";
import { useNavigate } from "react-router-dom";

const IndexHoraires = () => {
  // state (etats,donees)
  const [horaires, setHoraires] = useState([{}]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  //comportement

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/horairesAdmin",{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
      .then((response) => {
        setHoraires(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const goModify = (horaire) => {
    navigate("/Admin/Horaires/Edit", { state: { horaires: horaire } });
  };

  const deleteHoraire = (horaire) => {
    axios.delete(`/api/deleteHoraire/${horaire.id}`,{
      headers:{
          Authorization: `Bearer ${token}`
      }
  })
        .then((response)=>{
            console.log(response)
        })
        .catch((error)=>{
            console.log(error)
        })
}

  return (
    <table className="table">
      <thead>
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
          horaires.map((horaire) => (
            <tr key={horaire.id}>
              <th scope="row">{horaire.jour_semaine}</th>
              <td>{horaire.heure_ouverture}</td>
              <td>{horaire.heure_fermeture}</td>
              <td>
                <button
                  onClick={() => {
                    goModify(horaire);
                  }}
                >
                  Modifier
                </button>
                <button onClick={()=>{deleteHoraire(horaire)}}>Supprimer</button>
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
  );
};

export { IndexHoraires };
