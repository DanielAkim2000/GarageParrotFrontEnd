import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
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

const EditHoraires = () => {
  const location = useLocation();
  const horaire = location.state ? location.state.horaires : null;
  let navigate = useNavigate();
  const [jourSemaine, setJourSemaine] = useState([]);
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

  const token = localStorage.getItem("token");
  return (
    <FormContainer>
      <h1>Modification Horaire</h1>
      <Formik
        initialValues={{
          jour_semaine: `${horaire.jour_semaine}`,
          heure_ouverture: `${horaire.heure_ouverture}`,
          heure_fermeture: `${horaire.heure_fermeture}`,
        }}
        validationSchema={Yup.object({
          jour_semaine: Yup.string().required(
            "Le jour de la semaine est requis"
          ),
          heure_ouverture: Yup.string().required(
            "L'heure d'ouverture est requise"
          ),
          heure_fermeture: Yup.string().required(
            "L'heure de fermeture est requise"
          ),
        })}
        onSubmit={(values, { setSubmitting }) => {
          const response = window.confirm("Voulez-vous continuer ?");
          if (response) {
            const formData = new FormData();
            formData.append("jour_semaine", values.jour_semaine);
            formData.append("heure_ouverture", values.heure_ouverture);
            formData.append("heure_fermeture", values.heure_fermeture);

            axios
              .post(`/api/editHoraire/${horaire.id}`, formData, {
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
            <Field as="select" id="jour_semaine" name="jour_semaine">
              {jourSemaine
                ? jourSemaine.map((jour) => (
                    <option key={jour} value={jour}>
                      {jour}
                    </option>
                  ))
                : ""}
            </Field>
            <ErrorMessage name="marque" component={ErrorMessageContainer} />
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
            <SubmitButton type="submit">Enregister</SubmitButton>
          </FormGroup>
        </Form>
      </Formik>
    </FormContainer>
  );
};

export { EditHoraires };
