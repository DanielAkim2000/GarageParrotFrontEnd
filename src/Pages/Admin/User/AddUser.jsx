import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '../../../Api/axios.jsx'


const AddUser = () => {
  const token = localStorage.getItem("token");
  return (
    <div>
      <h1>Formulaire de creation d'utilisateurs</h1>
      <Formik
        initialValues={{
          firstname:'',
          lastname:'',
          password:'',
          email:'',

        }}
        validationSchema={Yup.object({
          //marque: Yup.string().required('La marque est requise'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          const formData = new FormData();
          formData.append('firstname', values.firstname);
          formData.append('lastname', values.lastname);
          formData.append('email', values.email);
          formData.append('password', values.password);

          axios.post('/api/createUtilisateur', formData,{
            headers: {
                'Authorization': 'Bearer '+token
            }
          })
            .then((response) => {
                console.log('Réponse du serveur:', response.data);
            })
            .catch((error) => {
                console.error('Erreur:', error);
                console.log(token)
            })
            .finally(() => {
                setSubmitting(false);
            });
        }}
      >
        <Form>
          <div>
            <label htmlFor="lastname">Nom:</label>
            <Field type="text" id="lastname" name="lastname" />
            <ErrorMessage name="marque" component="div" />
          </div>

          <div>
            <label htmlFor="firstname">Prénom:</label>
            <Field type="text" id="firstname" name="firstname" />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <Field type="text" id="email" name="email" />
          </div>

          <div>
            <label htmlFor="password">Mot de passe:</label>
            <Field type="text" id="password" name="password" />
          </div>

          <div>
            <button type="submit">Télécharger</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
export { AddUser }
