import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { accountService } from '../../services/account.services';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    // state etats données 

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    // console.log(email,password)
    // comportement 

    const onClick = (event) =>{
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/api/login',{
            "username": email,
            "password": password
        })
            .then((response) =>{
                accountService.saveToken(response.data.token)
                navigate('/admin')
            })
            .catch((error)=>{
                console.log(error)
            })
    }
    
    return (
        <form className='rounded shadow bg-white m-3'>
        <div className="form-group w-75 m-auto">
            <label for="exampleInputEmail1" className='m-1'>Email:</label>
            <input type="email" onChange={ (e) => { setEmail(e.target.value) } } value={email} className="form-control m-2" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <div className="form-group w-75 m-auto">
            <label for="exampleInputPassword1" className="m-1">Mot de passe:</label>
            <input type="password" onChange={ (e) => { setPassword(e.target.value) }} value={password} className="form-control m-2" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <div className="w-75 m-auto">
            <button type="submit" onClick={onClick} className="btn btn-primary m-2">Connexion</button>
        </div>
        </form>
    );
};

export { Login };