import axios from "../../Api/axios.jsx";
import React from "react";
import { useState } from "react";
import { accountService } from "../../services/account.services";
import { useNavigate } from "react-router-dom";
import { AlertAkim } from "../../Components/Public/index.jsx";


const Login = () => {
  // state etats données

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  // console.log(email,password)
  // comportement

  const onClick = (event) => {
    event.preventDefault();
    axios
      .post("/api/login", {
        username: email,
        password: password,
      })
      .then((response) => {
        accountService.saveToken(response.data.token);
        navigate("/admin");
      })
      .catch((error) => {
        setAlert(true)
      });
  };

  return (
    <form className="rounded w-25 shadow bg-white m-3">
      <div className="form-group w-75 m-auto">
        {alert?<AlertAkim texthead="Mot de passe ou email incorrets" text="Vérifier vos identifiants de connexion" variant='danger'/>:
        ''
        }
        <label for="exampleInputEmail1" className="m-1">
          Email:
        </label>
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          className="form-control m-2"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
      </div>
      <div className="form-group w-75 m-auto">
        <label for="exampleInputPassword1" className="m-1">
          Mot de passe:
        </label>
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          className="form-control m-2"
          id="exampleInputPassword1"
          placeholder="Password"
        />
      </div>
      <div className="w-75 m-auto">
        <button type="submit" onClick={onClick} className="btn btn-primary m-2">
          Connexion
        </button>
      </div>
    </form>
  );
};

export { Login };
