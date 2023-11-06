import React from "react";
import { useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import axios from "../../../Api/axios";
const EditUser = () => {
  const location = useLocation();
  const user = location.state.utilisateur;
  const [newuser, setNewuser] = useState({
    ...user,
  });

  const token = localStorage.getItem("token")
  
  const handleClick = () => {
    axios.post(`/api/editUsers/${newuser.id}`,newuser,{
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
  console.log(newuser);
  return (
    <Form.Group className="mb-3">
      <Form.Label>Prenom:</Form.Label>
      <Form.Control
        className="w-50"
        defaultValue={newuser.firstname}
        onChange={(event) => {
          setNewuser({
            ...newuser,
            firstname: event.target.value,
          });
        }}
      />
      <Form.Label>Nom:</Form.Label>
      <Form.Control
        className="w-50"
        defaultValue={newuser.lastname}
        onChange={(event) => {
          setNewuser({
            ...newuser,
            lastname: event.target.value,
          });
        }}
      />
      <Form.Label>Email:</Form.Label>
      <Form.Control
        className="w-50"
        defaultValue={newuser.email}
        onChange={(event) => {
          setNewuser({
            ...newuser,
            email: event.target.value,
          });
        }}
      />
      <Form.Label>Password:</Form.Label>
      <Form.Control
        className="w-50"
        defaultValue={newuser.password}
        onChange={(event) => {
          setNewuser({
            ...newuser,
            password: event.target.value,
          });
        }}
      />
      <Button onClick={handleClick}>Enregistrer</Button>
    </Form.Group>
  );
};

export { EditUser };
