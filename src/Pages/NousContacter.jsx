import Header from '../Components/Header/Header.jsx';
import styled from 'styled-components';
import Footer from '../Components/Footer/Footer.jsx';
import { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


const Main = styled.main`
    margin-top: 120px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    text-align:center;
`
const Form = styled.form`
    display:grid;
    grid-template-areas:
        "label1 input1 input1"
        "label2 input2 input2"
        "label3 input3 input3"
        "label4 input4 input4"
        "label5 input5 input5"
        "label6 input6 input6"
        " . button . "
    ;
    place-items: center;
    gap: 10px 10px;
    margin-bottom:20px;
`

export function NousContacter(props){
    // state (donnees et etats)
    let horaires = props.horaires;
    const [nom,setNom] = useState(null);
    const [prenom,setPrenom] = useState(null);
    const [email,setEmail] = useState(null);
    const [tel,setTel] = useState(null);
    const [sujet,setSujet] = useState(null);
    const [message,setMessage] = useState(null);
    const location = useLocation();
    const dataId = location.state;

    console.log(location.state)

    //comportement
    const addContact = (e) => {
        e.preventDefault();
        console.log({
            "nom": nom,
            "prenom": prenom,
            "email": email,
            "numero_telephone": tel,
            "message": message,
            "sujet": sujet
        });
        axios.post('http://localhost:8000/api/endpointcontact',{
            "nom": nom,
            "prenom": prenom,
            "email": email,
            "numero_telephone": tel,
            "message": message,
            "sujet": sujet,
            "dataId" : dataId
        })
            .then((response) => {
                console.log(response);
                alert(response.data.message);
                setNom(null);
                setPrenom(null);
                setEmail(null);
                setTel(null);
                setSujet(null);
                setMessage(null);  
            })
            .catch((error) => {
                    if (error.response) {
                    // la requête a été faite et le code de réponse du serveur n’est pas dans
                    // la plage 2xx
                    //console.log(error.response.data);
                    //console.log(error.response.status);
                    //console.log(error.response.headers);
                    } else if (error.request) {
                    // la requête a été faite mais aucune réponse n’a été reçue
                    // `error.request` est une instance de XMLHttpRequest dans le navigateur
                    // et une instance de http.ClientRequest avec node.js
                    console.log(error.request);
                    } else {
                    // quelque chose s’est passé lors de la construction de la requête et cela
                    // a provoqué une erreur
                    console.log('Error', error.message);
                    }
                    console.log(error.config);
            })
    }

    return (
    <>  
        <Header />
        <Main>
            <Form> 
                <label style={{gridArea:'label1'}} htmlFor="nom">Nom:</label>
                <input onChange={(e)=>{setNom(e.target.value)}} style={{gridArea:'input1'}} type="text" name="nom" id="nom" />
                <label style={{gridArea:'label2'}} htmlFor="prenom">Prenom:</label>
                <input onChange={(e)=>{setPrenom(e.target.value)}} style={{gridArea:'input2'}} type="text" name="prenom" id="prenom" />
                <label style={{gridArea:'label3'}} htmlFor="email">Email:</label>
                <input onChange={(e)=>{setEmail(e.target.value)}} style={{gridArea:'input3'}} type="email" name="email" id="email" />
                <label style={{gridArea:'label4'}} htmlFor="tel">Tel:</label>
                <input onChange={(e)=>{setTel(e.target.value)}} style={{gridArea:'input4'}} type="tel" name="tel" id="tel" />
                <label style={{gridArea:'label5'}} htmlFor="sujet">Sujet:</label>
                <input onChange={(e)=>{setSujet(e.target.value)}} style={{gridArea:'input5'}} type="text" name="sujet" id="sujet" />
                <label style={{gridArea:'label6'}} htmlFor="message">Message:</label>
                <textarea onChange={(e)=>{setMessage(e.target.value)}} style={{gridArea:'input6'}} name="message" id="message" />
                <input onClick={addContact} style={{gridArea:'button'}} type="submit" value="Envoyez" />
            </Form> 
        </Main>
        <Footer data={horaires}/>
    </>
    )
}