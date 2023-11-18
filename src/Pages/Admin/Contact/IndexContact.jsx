import React from "react";
import { useState, useEffect } from "react";
import axios from "../../../Api/axios.jsx";
import { Loading } from "../../../Components/Public";
import Button from "react-bootstrap/esm/Button.js";
import "../style.css";
const IndexContact = () => {
  // state (etats,donees)
  const [contacts, setContacts] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const token = localStorage.getItem("token");
  //comportement

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/contacts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setContacts(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reload]);

  const deleteContact = (contact) => {
    const response = window.confirm("Voulez-vous continuer ?");
    if (response) {
      axios
        .delete(`/api/deleteContact/${contact.id}`, {
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

  return (
    <div className="table-responsive ">
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">Prenom</th>
            <th scope="col">Email</th>
            <th scope="col">Numéro de téléphone</th>
            <th scope="col">Message</th>
            <th scope="col">Sujet</th>
            <th scope="col">Voiture</th>
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
          ) : contacts ? (
            contacts.map((contact) => (
              <tr key={contact.id}>
                <th scope="row">{contact.nom}</th>
                <td>{contact.prenom}</td>
                <td>{contact.email}</td>
                <td>{contact.numero_telephone}</td>
                <td>{contact.message}</td>
                <td>{contact.sujet}</td>
                <td className="image-cell">{contact.voiture?<img
                    src={contact.voiture.image}
                    alt={contact.voiture.modele}
                    className="img-fluid  img-thumbnail"
                  />:<>Pas d'image</>}</td>
                <td>
                  <Button
                    onClick={() => {
                      deleteContact(contact);
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

export { IndexContact };
