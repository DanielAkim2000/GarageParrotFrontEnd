import { Outlet } from "react-router-dom";
import { HeaderAdmin,SlideMenu } from '../../Components';
import styled from "styled-components";
import React from 'react';

const Div = styled.div`
    display:flex;
`

const LayoutAdmin = () => {
    return (
        <Div>
            <HeaderAdmin />
            <SlideMenu />
            <Outlet />
        </Div>
    );
}


export default LayoutAdmin;
