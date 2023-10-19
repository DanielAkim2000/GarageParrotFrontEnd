import { Outlet } from "react-router-dom";
import { HeaderAdmin,SlideMenu } from '../../Components/Admin';
import styled from "styled-components";
import React from 'react';

const Div = styled.div`
    display:flex; 
    flex-direction: column;
`

const LayoutAdmin = () => {
    return (
        <Div>
            <HeaderAdmin />
            <div className="d-flex w-100">
                <SlideMenu />
                <div className="w-100">
                    <Outlet />  
                </div>
            </div>
        </Div>
    );
}


export default LayoutAdmin;
