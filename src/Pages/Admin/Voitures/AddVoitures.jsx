import React, { useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import axios from "../../../Api/axios.jsx";
import {
  FormContainer,
  FormGroup,
  Label,
  Input,
  FileInput,
  ErrorMessageContainer,
  SubmitButton,
} from "../../../Components/Admin";
import { useNavigate } from "react-router-dom";

const AddVoitures = () => {
  const [image, setImage] = useState(null);
  let navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const token = localStorage.getItem("token");

  return (
    <FormContainer>
      <h1>Formulaire de création de voiture</h1>
      <Formik
        initialValues={{
          marque: null,
          modele: null,
          annee_mise_en_circulation: 2000,
          prix: null,
          kilometrage: null,
          description: "Essence",
        }}
        validationSchema={Yup.object({
          marque: Yup.string().required(
            "La marque est requise et doit etre une chaine de caractère"
          ),
          modele: Yup.string().required(
            "Le modèle est requis et doit etre une chaine de caractère"
          ),
          annee_mise_en_circulation: Yup.number().required(
            `L'année est requise et doit être un nombre`
          ),
          prix: Yup.number().required(
            "Le prix est requis et doit être un nombre"
          ),
          kilometrage: Yup.number().required(
            "Le kilométrage est requis et doit être un nombre"
          ),
          description: Yup.string().required(
            "La description est requise et doit etre une chaine de caractère"
          ),
        })}
        onSubmit={(values, { setSubmitting }) => {
          const response = window.confirm("Voulez-vous continuer ?");
          if (response) {
            const formData = new FormData();
            formData.append("marque", values.marque);
            formData.append("modele", values.modele);
            formData.append("prix", values.prix);
            formData.append(
              "annee_mise_en_circulation",
              values.annee_mise_en_circulation
            );
            formData.append("kilometrage", values.kilometrage);
            formData.append("description", values.description);
            formData.append("image", image);

            axios
              .post("/api/createVoiture", formData, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                console.log("Réponse du serveur:", response.data);
                navigate("/Admin/Voitures/Index");
              })
              .catch((error) => {
                console.error("Erreur:", error);
                navigate("/Admin/Voitures/Index");
              })
              .finally(() => {
                setSubmitting(false);
              });
          }
        }}
      >
        <Form>
          <FormGroup>
            <Label htmlFor="marque">Marque</Label>
            <Input type="text" id="marque" name="marque" />
            <ErrorMessage name="marque" component={ErrorMessageContainer} />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="modele">Modèle</Label>
            <Input type="text" id="modele" name="modele" />
            <ErrorMessage name="modele" component={ErrorMessageContainer} />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="annee_mise_en_circulation">
              Année de mise en circulation
            </Label>
            <Input
              type="number"
              id="annee_mise_en_circulation"
              name="annee_mise_en_circulation"
            />
            <ErrorMessage
              name="annee_mise_en_circulation"
              component={ErrorMessageContainer}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="prix">Prix</Label>
            <Input type="number" id="prix" name="prix" />
            <ErrorMessage name="prix" component={ErrorMessageContainer} />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="kilometrage">Kilométrage</Label>
            <Input type="number" id="kilometrage" name="kilometrage" />
            <ErrorMessage
              name="kilometrage"
              component={ErrorMessageContainer}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="description">Description</Label>
            <Field as="select" className="Field" id="description" name="description" >
            <option key="Essence" value="Essence">
                      Essence
            </option>
            <option key="Diesel" value="Diesel">
                      Diesel
            </option>
            <option key="Electrique" value="Electrique">
                      Electrique
            </option>
            <option key="Hybride" value="Hybride">
                      Hybride
            </option>
            </Field>
            <ErrorMessage
              name="description"
              component={ErrorMessageContainer}
            />
          </FormGroup>

          <FormGroup>
            <FileInput
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImageChange}
            />
            <ErrorMessage name="image" component={ErrorMessageContainer} />
          </FormGroup>

          <FormGroup>
            <SubmitButton type="submit">Enregistrer</SubmitButton>
          </FormGroup>
        </Form>
      </Formik>
    </FormContainer>
  );
};
export { AddVoitures };
