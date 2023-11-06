import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '../../../Api/axios.jsx'

const AddServices = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const token = localStorage.getItem("token");

  return (
    <div>
      <h1>Formulaire de téléchargement d'image</h1>
      <Formik
        initialValues={{
          nom: '',
          description: '',
        }}
        validationSchema={Yup.object({
          nom: Yup.string().required('Le nom est requis'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          const formData = new FormData();
          formData.append('nom', values.nom);
          formData.append('description', values.description || '');
          formData.append('image', image);
          console.log(formData)

          // Utilisez ici l'API pour envoyer le formulaire (par exemple, fetch)
          axios.post('/api/createService', formData,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log('Réponse du serveur:', response.data);
                // Effectuez ici une redirection ou une autre action après avoir téléchargé les données.
            })
            .catch((error) => {
                console.error('Erreur:', error);
                console.log(values.nom)
            })
            .finally(() => {
                setSubmitting(false);
            });
        }}
      >
        <Form>
          <div>
            <label htmlFor="nom">Nom</label>
            <Field type="text" id="nom" name="nom" />
            <ErrorMessage name="nom" component="div" />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <Field as="textarea" id="description" name="description" />
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

export { AddServices };

