import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useLocation } from "react-router-dom";
import * as Yup from 'yup';
import axios from '../../../Api/axios.jsx'

const EditVoitures = () => {
  const [image, setImage] = useState(null);

  const location = useLocation();
  const voiture = location.state.voitures;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const token = localStorage.getItem("token")

  return (
    <div>
      <h1>Formulaire de téléchargement d'image</h1>
      <Formik
        initialValues={{
          marque: `${voiture.marque}`,
          modele: `${voiture.modele}`,
          annee_mise_en_circulation: `${voiture.annee_mise_en_circulation}`,
          prix: `${voiture.prix}`,
          kilometrage: `${voiture.kilometrage}`,
          description: `${voiture.description}`, 
        }}
        validationSchema={Yup.object({
          marque: Yup.string().required('La marque est requise'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          const formData = new FormData();
          formData.append('marque', values.marque);
          formData.append('modele', values.modele);
          formData.append('prix', values.prix);
          formData.append('annee_mise_en_circulation', values.annee_mise_en_circulation);
          formData.append('kilometrage', values.kilometrage);
          formData.append('description', values.description);
          formData.append('image', image);

          axios.post(`/api/editVoiture/${voiture.id}`, formData,{
            headers: {
                Authorization: `Bearer ${token}`
            }
          })
            .then((response) => {
                console.log('Réponse du serveur:', response.data);
            })
            .catch((error) => {
                console.error('Erreur:', error);
            })
            .finally(() => {
                setSubmitting(false);
            });
        }}
      >
        <Form>
          <div>
            <label htmlFor="marque">Marque</label>
            <Field type="text" id="marque" name="marque" />
            <ErrorMessage name="marque" component="div" />
          </div>

          <div>
            <label htmlFor="modele">Modèle</label>
            <Field type="text" id="modele" name="modele" />
          </div>

          <div>
            <label htmlFor="annee_mise_en_circulation">Année de mise en circulation</label>
            <Field type="text" id="annee_mise_en_circulation" name="annee_mise_en_circulation" />
          </div>

          <div>
            <label htmlFor="prix">Prix</label>
            <Field type="number" id="prix" name="prix" />
          </div>

          <div>
            <label htmlFor="kilometrage">Kilométrage</label>
            <Field type="text" id="kilometrage" name="kilometrage" />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <Field type="text" id="description" name="description" />
          </div>

          <div>
            <label>Image</label>
            <img src={voiture.image} alt="" />
          </div>

          <div>
            <input type="file" accept="image/*" name='image' onChange={handleImageChange} />
          </div>

          <div>
            <button type="submit">Télécharger</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
export { EditVoitures };