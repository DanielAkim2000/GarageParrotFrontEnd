import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import styled from 'styled-components';
import { useState } from "react";
import axios from 'axios';

// styles components

const Main = styled.div`
display:flex;
justify-content:center;
align-items:center;
margin-top:120px;
`

const Form = styled.form`
    display:flex;
    flex-direction:column;
`
export default function Avis(props){
    // state (etats,donees)
    const [nom,setNom] = useState("");
    const [commentaire,setCommentaire] =  useState("");
    const [note,setNote] = useState();
    const horaires = props.horaires;

    // comportements

    const addAvis = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8000/api/endpointavis', {
            "nom": nom,
            "commentaire": commentaire,
            "note": note
        })
            .then((response)=>{
                console.log(response)
            })
            .catch((error)=>{
                console.log(error);
            })
    }
    return (
    <>  
        <Header />
        <Main>
            <Form> 
                <label  htmlFor="nom">Nom:</label>
                <input onChange={(e)=>{setNom(e.target.value)}} style={{}} type="text" name="nom" id="nom" />
                <label style={{}} htmlFor="commentaire">Commentaire:</label>
                <textarea onChange={(e)=>{setCommentaire(e.target.value)}} style={{}} name="Commentaire" id="Commentaire" />
                <label style={{}} htmlFor="note">Note:</label>
                <input onChange={(e)=>{setNote(e.target.value)}} style={{}} type="number" name="note" id="note" />
                <input onClick={addAvis} style={{}} type="submit" value="Envoyez" />
            </Form> 
        </Main>
        <Footer data={horaires}/>
    </>
    )
}