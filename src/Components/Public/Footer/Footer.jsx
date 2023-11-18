import styled from "styled-components";
import React from "react";
import "./Footer.css";
import { MDBFooter, MDBContainer, MDBCol, MDBRow } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { ModalContact } from "../ModalContact/ModalContact";

const CustomFooter = styled.footer`
  display: grid;
  grid-area-templates: " horaires " " options " " basdepage ";
  place-items: center;
  background-color: black;
  color: white;
`;

const JoursSemaine = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

const Footer = (props) => {
  // données
  let horaires = props.data;
  const horairesTries = horaires.sort(
    (a, b) =>
      JoursSemaine.indexOf(a.jour_semaine) -
      JoursSemaine.indexOf(b.jour_semaine)
  );

  return (
    <CustomFooter className="mt-3">
      <MDBFooter className="text-center w-100" color="white" bgColor="dark">
        <MDBContainer className="p-4">
          <section className="mt-2">
            <MDBRow>
              {horaires &&
                horairesTries.map((horaire) => (
                  <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
                    <h5 className="text-uppercase">{horaire.jour_semaine}</h5>
                    <ul className="list-unstyled mb-0">
                      <li>
                        <p className="text-white">
                          {horaire.heure_ouverture === "00:00" &&
                          horaire.heure_fermeture === "00:00"
                            ? "Fermé"
                            : horaire.heure_ouverture +
                              " - " +
                              horaire.heure_fermeture}
                        </p>
                      </li>
                    </ul>
                  </MDBCol>
                ))}
            </MDBRow>
          </section>
        </MDBContainer>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2023 Copyright:
          <Link className="text-white" to="/Home">
            Accueil
          </Link>
          <div>
            <p>Nous contactez:</p>
            <ModalContact />
          </div>
        </div>
      </MDBFooter>
    </CustomFooter>
  );
};

export { Footer };
