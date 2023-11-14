import React, { useState } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import styled from "styled-components";
import "./style.css";

const StyledLink = styled(Link)`
  text-decoration: none;
  outline: none;
  color: black;
`;

const SlideMenu = () => {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userRoles = decodedToken ? decodedToken.roles : [];

  const [showServices, setShowServices] = useState(false);
  const [showEmploye, setShowEmploye] = useState(false);
  const [showHoraires, setShowHoraires] = useState(false);
  const [showAvis, setShowAvis] = useState(false);
  const [showVoitures, setShowVoitures] = useState(false);
  return (
    <ul className="p-2 menu" style={{ paddingRight: "10px", paddingBottom: 0 }}>
      <li className="border-bottom border-dark  w-75">
        <button className="btn  align-items-center rounded" to="/Admin">
          Accueil
        </button>
      </li>
      {userRoles.includes("ROLE_ADMIN") === true && (
        <li className="border-bottom border-dark  w-75">
          <button
            className="btn  align-items-center rounded"
            onClick={() => {
              setShowServices(!showServices);
            }}
          >
            Services
          </button>
          {showServices && (
            <ul className="d-flex flex-column">
              <StyledLink className="btn" to="/Admin/Services/Index">
                Index
              </StyledLink>
              <StyledLink className="btn" to="/Admin/Services/Add">
                Ajouter
              </StyledLink>
            </ul>
          )}
        </li>
      )}
      {userRoles.includes("ROLE_ADMIN") === true && (
        <li className="border-bottom border-dark  w-75">
          <button
            className="btn  align-items-center rounded"
            onClick={() => {
              setShowEmploye(!showEmploye);
            }}
          >
            Employé
          </button>
          {showEmploye && (
            <ul className="d-flex flex-column">
              <StyledLink className="btn" to="/Admin/User/Index">
                Index
              </StyledLink>
              <StyledLink className="btn" to="/Admin/User/Add">
                Ajouter
              </StyledLink>
            </ul>
          )}
        </li>
      )}
      {userRoles.includes("ROLE_USER") === true && (
        <li className="border-bottom border-dark  w-75">
          <button
            className="btn  align-items-center rounded "
            onClick={() => {
              setShowVoitures(!showVoitures);
            }}
          >
            Voitures
          </button>
          {showVoitures && (
            <ul className="d-flex flex-column">
              <StyledLink className="btn" to="/Admin/Voitures/Index">
                Index
              </StyledLink>
              <StyledLink className="btn" to="/Admin/Voitures/Add">
                Ajouter
              </StyledLink>
            </ul>
          )}
        </li>
      )}
      {userRoles.includes("ROLE_ADMIN") === true && (
        <li className="border-bottom border-dark  w-75">
          <button
            className="btn  align-items-center rounded"
            onClick={() => {
              setShowHoraires(!showHoraires);
            }}
          >
            Horaires
          </button>
          {showHoraires && (
            <ul className="d-flex flex-column">
              <StyledLink className="btn" to="/Admin/Horaires/Index">
                Index
              </StyledLink>
              <StyledLink className="btn" to="/Admin/Horaires/Add">
                Ajouter
              </StyledLink>
            </ul>
          )}
        </li>
      )}
      {userRoles.includes("ROLE_USER") === true && (
        <li className="border-bottom border-dark w-75">
          <button
            className="btn align-items-center align-self-start rounded"
            onClick={() => {
              setShowAvis(!showAvis);
            }}
          >
            Avis
          </button>
          {showAvis && (
            <ul className="d-flex flex-column">
              <StyledLink className="btn" to="/Admin/Avis/Index">
                Index
              </StyledLink>
              <StyledLink className="btn" to="/Admin/Avis/Add">
                Ajouter
              </StyledLink>
            </ul>
          )}
        </li>
      )}
      {userRoles.includes("ROLE_USER") === true && (
        <li className="w-75">
          <StyledLink
            className="btn align-items-center rounded"
            to="/Admin/Contacts/Index"
          >
            Contacts
          </StyledLink>
        </li>
      )}
    </ul>
  );
};

export { SlideMenu };
