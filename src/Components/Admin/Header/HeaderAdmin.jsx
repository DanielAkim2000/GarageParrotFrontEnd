import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { accountService } from '../../../services/account.services';
import { useNavigate } from 'react-router-dom';

const HeaderAdmin = () => {
    let navigate = useNavigate()
    const logout = () => {
        accountService.logout()
        navigate('/')
    }
    return (
        <Navbar className="bg-body-tertiary border-bottom">
            <Container>
                <Navbar.Brand href="#home">Admin</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Button variant="primary" onClick={logout}>
                    Deconnexion
                </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export { HeaderAdmin };
