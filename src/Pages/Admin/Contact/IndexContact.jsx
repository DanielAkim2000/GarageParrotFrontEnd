import React from "react";
import { useState, useEffect } from "react";
import axios from "../../../Api/axios.jsx";
import { Loading } from "../../../Components/Public";

const IndexContact = () => {
  // state (etats,donees)
  const [contacts, setContacts] = useState([{}]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  //comportement

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/contacts",{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
      .then((response) => {
        setContacts(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteContact = (contact) => {
    axios.delete(`/api/deleteContact/${contact.id}`,{
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
          <th scope="col">Nom</th>
          <th scope="col">Prenom</th>
          <th scope="col">Email</th>
          <th scope="col">Numéro de téléphone</th>
          <th scope="col">Message</th>
          <th scope="col">Sujet</th>
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
              <td>
                <button onClick={()=>{deleteContact(contact)}}>Supprimer</button>
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

export { IndexContact };