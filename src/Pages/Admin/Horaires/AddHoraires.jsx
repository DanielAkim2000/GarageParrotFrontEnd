import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import axios from "../../../Api/axios.jsx";
import {
  FormContainer,
  FormGroup,
  Label,
  Input,
  ErrorMessageContainer,
  SubmitButton,
} from "../../../Components/Admin";
import { useNavigate } from "react-router-dom";

const AddHoraires = () => {
  const token = localStorage.getItem("token");
  const [jourSemaine, setJourSemaine] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/jour")
      .then((response) => {
        setJourSemaine(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <FormContainer>
      <h1>Formulaire de création horaire</h1>
      <Formik
        initialValues={{
          jour_semaine: "Lundi",
          heure_ouverture: "",
          heure_fermeture: "",
        }}
        validationSchema={Yup.object({
          jour_semaine: Yup.string().required("Le jour est requis"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          const response = window.confirm("Voulez-vous continuer ?");
          if (response) {
            const formData = new FormData();
            formData.append("jour_semaine", values.jour_semaine);
            formData.append("heure_ouverture", values.heure_ouverture);
            formData.append("heure_fermeture", values.heure_fermeture);
            formData.forEach((value, key) => {
              console.log(key, value);
            });
            axios
              .post("/api/createHoraire", formData, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                console.log("Réponse du serveur:", response.data);
                navigate("/Admin/Horaires/Index");
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
            <Label htmlFor="jour_semaine">Jour:</Label>
            <Field as="select" className='Field' id="jour_semaine" name="jour_semaine">
              {jourSemaine
                ? jourSemaine.map((jour) => (
                    <option key={jour} value={jour}>
                      {jour}
                    </option>
                  ))
                : ""}
            </Field>
            <ErrorMessage
              name="jour_semaine"
              component={ErrorMessageContainer}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="heure_ouverture">Heure d'ouverture</Label>
            <Input type="time" id="heure_ouverture" name="heure_ouverture" />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="heure_fermeture">Heure de fermeture</Label>
            <Input type="time" id="heure_fermeture" name="heure_fermeture" />
          </FormGroup>

          <FormGroup>
            <SubmitButton type="submit">Enregistrer</SubmitButton>
          </FormGroup>
        </Form>
      </Formik>
    </FormContainer>
  );
};
export { AddHoraires };
