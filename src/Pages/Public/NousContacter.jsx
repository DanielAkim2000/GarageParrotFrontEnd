import styled from 'styled-components';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


const Form = styled.form`
    display:grid;
    grid-template-areas:
        "label1 input1 input1 img img img"
        "label2 input2 input2 img img img"
        "label3 input3 input3 img img img"
        "label4 input4 input4 img img img"
        "label5 input5 input5 img img img"
        "label6 input6 input6 img img img"
        " . button . img img img"
    ;
    place-items: center;
    gap: 10px 10px;
    margin-bottom:20px;
`

const NousContacter = (props) => { 
    // state (donnees et etats)
    const [nom,setNom] = useState(null);
    const [prenom,setPrenom] = useState(null);
    const [email,setEmail] = useState(null);
    const [tel,setTel] = useState(null);
    const [sujet,setSujet] = useState(null);
    const [message,setMessage] = useState(null);
    const location = useLocation();
    const data = location.state;
    const [isImgVisible,setIsImgVisible] = useState(false);

    console.log(location.state)

    //comportement

    useEffect(()=>{
        if(data){
            setIsImgVisible(true)
        }
    },[data,isImgVisible])
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
            "dataId" : data.id
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
                {isImgVisible?
                    <img style={{gridArea:'img'}} src={'/'+data.image} alt={data.marque} />
                    :
                    <div style={{gridArea:'img',display:'none'}} ></div>
                }
                <input onClick={addContact} style={{gridArea:'button'}} type="submit" value="Envoyez" />
            </Form> 
    )
}

export { NousContacter };