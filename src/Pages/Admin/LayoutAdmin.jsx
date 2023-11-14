import { Outlet } from "react-router-dom";
import { HeaderAdmin, SlideMenu } from "../../Components/Admin";
import styled from "styled-components";
import React from "react";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  border-bottom: 2px solid black;
`;
const Separator = styled.div`
  width: 2px;
  background-color: black; /* Couleur de la barre de séparation */
`;
const LayoutAdmin = () => {
  return (
    <Div className="container-fluid w-100 m-0 p-0">
      <HeaderAdmin />
      <div className="d-flex w-100">
        <SlideMenu />
        <Separator />
        <div className="outlet">
          <Outlet />
        </div>
      </div>
    </Div>
  );
};

export default LayoutAdmin;
