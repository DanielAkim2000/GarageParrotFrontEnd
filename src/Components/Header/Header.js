import styled from 'styled-components'
import logo from '../../Logo.png'
import React, { useEffect,useState } from 'react';
import '../../Styles/Header.css';

    const Container = styled.header`
        display: grid;
        justify-content: space-between;
        width: 100vw;
        backdrop-filter: blur(5px);
        align-items : center;
        position: fixed;
        background-color: black;
        opacity: 0.7;
        overflow: hidden;
        color: white;
        grid-template-areas: "logo navbutton" "nav nav";
    `
    
    const Image = styled.img`
        max-width: 3rem;
        max-height: 3rem;
        grid-area: logo;

    `
    const Nav = styled.nav`
        display: grid;
        justify-items: center;
        grid-area: nav;
    `
    const NavButton = styled.button`

    `
    const CustomLi = styled.li`
        border-top: solid white 1px;
        list-style-type: none;
        width: 100%;
        display: grid;
        place-items: center;
    `
    const UL = styled.ul`
        width: 100%;
        padding: 0;
        margin: 0;
        display:grid;
        height: 30vh;
        grid-template-rows: repeat(4, auto);
        grid-template-columns:none:
        grid-row-gap: 25%;
    `
    
      
    export default function Header(){
        const [isBigScreen, setIsBigScreen] = useState(false);
        useEffect(() => {
            const mediaQuery = window.matchMedia("(min-width: 700px)");
            
            const handleMediaQueryChange = (event) => {
                // <700px
                if (event.matches) {
                setIsBigScreen(true);
                } 
                else {
                // >700px
                    setIsBigScreen(false);    
                }
            };
        
            // Ajoute un écouteur d'événement pour le changement de la requête media
            mediaQuery.addEventListener("change", handleMediaQueryChange);
        
            // Appelez initialement la fonction de gestion pour prendre en compte l'état actuel
            handleMediaQueryChange(mediaQuery);
        
            // Retirez l'écouteur d'événement lorsque le composant est démonté
            return () => {
            mediaQuery.removeEventListener("change", handleMediaQueryChange);
            };
        }, []);

            // 
        const [isNavVisible, setIsNavVisible] = useState(false);
            
            //Changement au niveau de l'ecran
        const toggle = () => {
            console.log('AppuieBoutton');
            setIsNavVisible(!isNavVisible);
        }
        return(
            <Container>
                <Image src={logo} />
                {isNavVisible && (
                    <Nav>
                        <UL>
                            <CustomLi><a>Accueil</a></CustomLi>
                            <CustomLi><a>Nos Services</a></CustomLi>
                            <CustomLi><a>Voitures</a></CustomLi>
                            <CustomLi style={{borderBottom: 'solid white 1px'}}><a>Nous Conctatez</a></CustomLi>
                        </UL>
                    </Nav>
                )}
                <NavButton onClick={toggle}></NavButton>
            </Container>
        )
    }