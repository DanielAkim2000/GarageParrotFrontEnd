import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../../Api/axios.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FormContainer,
  FormGroup,
  Label,
  Input,
  ErrorMessageContainer,
  SubmitButton,
} from "../../../Components/Admin";

const SliderField = ({ field, form }) => {
  const toggleSlider = () => {
    const newValue = !field.value;
    form.setFieldValue(field.name, newValue);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "50px",
        height: "20px",
        backgroundColor: "#ccc",
        borderRadius: "20px",
        cursor: "pointer",
      }}
      onClick={toggleSlider}
    >
      <div
        style={{
          position: "absolute",
          width: "20px",
          height: "20px",
          backgroundColor: "#2196F3",
          borderRadius: "50%",
          transition: "0.4s",
          transform: field.value ? "translateX(30px)" : "translateX(0)",
        }}
      />
    </div>
  );
};

const EditAvis = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const avis = location.state ? location.state.avis : null;
  let navigate = useNavigate();
  return (
    <FormContainer>
      <h1>Modifications des données d'avis</h1>
      <Formik
        initialValues={{
          nom: `${avis.nom}`,
          commentaire: `${avis.commentaire}`,
          note: avis.note,
          modere: avis.modere,
        }}
        validationSchema={Yup.object({
          nom: Yup.string().required(
            "La marque est requise et doit être une chaine de caractère"
          ),
          commentaire: Yup.string().required(
            "Le commenataire est requis et doit être une chaine de caractère"
          ),
          note: Yup.number()
            .min(0, "La note ne peut pas être inférieure à 0")
            .max(5, "La note ne peut pas dépasser 5")
            .required("La note est requise et doit être un chiffre"),
          modere: Yup.boolean(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          const response = window.confirm("Voulez-vous continuer ?");
          if (response) {
            const formData = new FormData();
            formData.append("nom", values.nom);
            formData.append("commentaire", values.commentaire);
            formData.append("note", values.note);
            formData.append("modere", values.modere);
            formData.forEach((value, key) => {
              console.log(key, value);
            });
            axios
              .post(`/api/editTemoignage/${avis.id}`, formData, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                console.log("Réponse du serveur:", response.data);
                navigate("/Admin/Avis/Index");
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
            <Label htmlFor="nom">Nom:</Label>
            <Input type="text" id="nom" name="nom" />
            <ErrorMessage name="nom" component={ErrorMessageContainer} />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="commentaire">Commentaire</Label>
            <Input type="text" id="commentaire" name="commentaire" />
            <ErrorMessage
              name="commentaire"
              component={ErrorMessageContainer}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="note">Note</Label>
            <Input type="number" id="note" name="note" />
            <ErrorMessage name="note" component={ErrorMessageContainer} />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="modere">Activer/Désactiver :</Label>
            <Input name="modere" component={SliderField} />
            <ErrorMessage name="modere" component={ErrorMessageContainer} />
          </FormGroup>

          <FormGroup>
            <SubmitButton type="submit">Enregistrer</SubmitButton>
          </FormGroup>
        </Form>
      </Formik>
    </FormContainer>
  );
};

export { EditAvis };
