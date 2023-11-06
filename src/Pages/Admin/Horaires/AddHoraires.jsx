import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '../../../Api/axios.jsx'

const AddHoraires = () => {
  const token = localStorage.getItem("token")
  const [jourSemaine,setJourSemaine] = useState([])
  useEffect(()=>{
    axios.get('/jour')
        .then((response)=>{
            setJourSemaine(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])
  return (
    <div>
      <h1>Formulaire de téléchargement d'image</h1>
      <Formik
        initialValues={{
          jour_semaine:'Lundi',
          heure_ouverture:'',
          heure_fermeture:'',
        }}
        validationSchema={Yup.object({
          //marque: Yup.string().required('La marque est requise'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          const formData = new FormData();
          formData.append('jour_semaine', values.jour_semaine);
          formData.append('heure_ouverture', values.heure_ouverture);
          formData.append('heure_fermeture', values.heure_fermeture);
          formData.forEach((value, key) => {
            console.log(key, value);
          });           
          axios.post('/api/createHoraire', formData,{
            headers: {
                'Authorization': `Bearer ${token}`
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
            <label htmlFor="jour_semaine">Jour:</label>
            <Field as="select" id="jour_semaine" name="jour_semaine">
                {jourSemaine?jourSemaine.map((jour) => (
                    <option key={jour} value={jour}>
                    {jour}
                    </option>
                )):''}
            </Field>
            <ErrorMessage name="marque" component="div" />
          </div>

          <div>
            <label htmlFor="heure_ouverture">Heure d'ouverture</label>
            <Field type="time" id="heure_ouverture" name="heure_ouverture" />
          </div>

          <div>
            <label htmlFor="heure_fermeture">Heure de fermeture</label>
            <Field type="time" id="heure_fermeture" name="heure_fermeture" />
          </div>

          <div>
            <button type="submit">Télécharger</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
export { AddHoraires }
