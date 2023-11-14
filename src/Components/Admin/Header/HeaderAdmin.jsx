import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { accountService } from "../../../services/account.services";
import { useNavigate } from "react-router-dom";
import logo from "../../../logo.jpg";
import styled from "styled-components";
import jwtDecode from "jwt-decode";

const Image = styled.img`
  max-width: 3rem;
  max-height: 3rem;
  grid-area: logo;
  justify-items: start;
  justify-self: start;
`;

const HeaderAdmin = () => {
  let navigate = useNavigate();
  const logout = () => {
    accountService.logout();
    navigate("/");
  };
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userName = decodedToken ? decodedToken.username : "";
  console.log(userName);
  return (
    <Navbar
      className="bg-body-tertiary d-flex flex-row flex-wrap border-bottom m-0 p-0"
      style={{ maxWidth: "100vw" }}
    >
      <Image className="m-0 p-0" src={logo} />
      <Container className="m-0">
        <Navbar.Brand>Garage V.Parrot Administration</Navbar.Brand>
        <Navbar.Brand className="text-primary">{userName}</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end align-self-end">
          <Button
            variant="primary"
            className="align-self-end m-0"
            onClick={logout}
          >
            Deconnexion
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export { HeaderAdmin };
