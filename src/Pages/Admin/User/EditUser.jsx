import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../../Api/axios.jsx";
import {
  FormContainer,
  FormGroup,
  Label,
  Input,
  SubmitButton,
  ErrorMessageContainer,
} from "../../../Components/Admin";

const EditUser = () => {
  const location = useLocation();
  const utilisateur = location.state ? location.state.utilisateur : null;
  const token = localStorage.getItem("token");
  let navigate = useNavigate();

  return (
    <FormContainer>
      <h1>Modifications des données d'employé</h1>
      <Formik
        initialValues={{
          firstname: `${utilisateur.firstname}`,
          lastname: `${utilisateur.lastname}`,
          email: `${utilisateur.email}`,
          password: `${utilisateur.password}`,
        }}
        validationSchema={Yup.object({
          firstname: Yup.string().required(
            "Le prénom est requis et doit être une chaine de caractère"
          ),
          lastname: Yup.string().required(
            "Le nom est requis et doit être une chaine de caractère"
          ),
          password: Yup.string().required(
            "Le mot de passe est requis et doit être une chaine de caractère"
          ),
          email: Yup.string().required(
            `L'email est requis et doit être une chaine de caractère`
          ),
        })}
        onSubmit={(values, { setSubmitting }) => {
          const response = window.confirm("Voulez-vous continuer ?");
          if (response) {
            const formData = new FormData();
            formData.append("firstname", values.firstname);
            formData.append("lastname", values.lastname);
            formData.append("email", values.email);
            formData.append("password", values.password);
            console.log(formData);

            // Utilisez ici l'API pour envoyer le formulaire (par exemple, fetch)
            axios
              .post(`/api/editUsers/${utilisateur.id}`, formData, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                console.log("Réponse du serveur:", response.data);
                navigate("/Admin/User/Index");
                // Effectuez ici une redirection ou une autre action après avoir téléchargé les données.
              })
              .catch((error) => {
                console.error("Erreur:", error);
              })
              .finally(() => {
                setSubmitting(false);
              });
          }
        }}
      >
        <Form>
          <FormGroup>
            <Label htmlFor="firstname">Prénom:</Label>
            <Input type="text" id="firstname" name="firstname" />
            <ErrorMessage name="firstname" component={ErrorMessageContainer} />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="lastname">Nom:</Label>
            <Input type="text" id="lastname" name="lastname" />
            <ErrorMessage name="lastname" component={ErrorMessageContainer} />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email:</Label>
            <Input type="text" id="email" name="email" />
            <ErrorMessage name="email" component={ErrorMessageContainer} />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password:</Label>
            <Input type="text" id="password" name="password" />
            <ErrorMessage name="password" component={ErrorMessageContainer} />
          </FormGroup>

          <FormGroup>
            <SubmitButton type="submit">Enregistrer</SubmitButton>
          </FormGroup>
        </Form>
      </Formik>
    </FormContainer>
  );
};

export { EditUser };
