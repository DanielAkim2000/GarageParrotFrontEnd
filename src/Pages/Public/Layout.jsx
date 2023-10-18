import { Header,Footer } from '../../Components';
import React from 'react';
import { Outlet } from "react-router-dom";
import styled from 'styled-components';

const Main = styled.main`
    margin-top:3rem;
`

const Layout = (props) => {
    const horaires = props.horaires
    return (
        <>
            <Header />
            <Main>
                <Outlet />
            </Main>
            <Footer data={horaires} />
        </>
    );
}


export { Layout };
