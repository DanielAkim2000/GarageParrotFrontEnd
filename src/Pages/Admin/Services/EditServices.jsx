import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../../Api/axios.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FormContainer,
  FormGroup,
  Label,
  Input,
  FileInput,
  ErrorMessageContainer,
  SubmitButton,
  ImageInput,
} from "../../../Components/Admin";

const EditServices = () => {
  const location = useLocation();
  const service = location.state ? location.state.services : null;
  const [image, setImage] = useState(null);
  let navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const token = localStorage.getItem("token");

  return (
    <FormContainer>
      <h1>Modifications des données du service</h1>
      <Formik
        initialValues={{
          nom: `${service.nom}`,
          description: service.description,
        }}
        validationSchema={Yup.object({
          nom: Yup.string().required(
            "Le nom du service est requis et doit être une chaine de caractère"
          ),
          description: Yup.string().required(
            "La description du service est requise et doit être une chaine de caractère"
          ),
        })}
        onSubmit={(values, { setSubmitting }) => {
          const response = window.confirm("Voulez-vous continuer ?");
          if (response) {
            const formData = new FormData();
            formData.append("nom", values.nom);
            formData.append("description", values.description);
            formData.append("image", image);
            console.log(formData);

            // Utilisez ici l'API pour envoyer le formulaire (par exemple, fetch)
            axios
              .post(`/api/editService/${service.id}`, formData, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                console.log("Réponse du serveur:", response.data);
                navigate("/Admin/Services/Index");
                // Effectuez ici une redirection ou une autre action après avoir téléchargé les données.
              })
              .catch((error) => {
                console.error("Erreur:", error);
                console.log(values.nom);
              })
              .finally(() => {
                setSubmitting(false);
              });
          }
        }}
      >
        <Form>
          <FormGroup>
            <Label htmlFor="nom">Nom</Label>
            <Input type="text" id="nom" name="nom" />
            <ErrorMessage name="nom" component={ErrorMessageContainer} />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="description">Description</Label>
            <Input type="text" id="description" name="description" />
            <ErrorMessage
              name="description"
              component={ErrorMessageContainer}
            />
          </FormGroup>

          <FormGroup>
            <Label>Image</Label>
            <ImageInput src={service ? service.image : null} alt="" />
          </FormGroup>

          <FormGroup>
            <FileInput
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImageChange}
            />
          </FormGroup>

          <FormGroup>
            <SubmitButton type="submit">Enregistrer</SubmitButton>
          </FormGroup>
        </Form>
      </Formik>
    </FormContainer>
  );
};

export { EditServices };
