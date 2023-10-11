import styled,{ css } from 'styled-components'
import logo from '../../logo.jpg'
import React, { useEffect,useState } from 'react';
import '../../Styles/Header.css';
    // styles-compenent
    const color_over = `rgba(20, 116, 199)`;
    const colorBackgroundHeader = `white`;
    const sizeScreenMiddle = `700px`;
    const sizeScreenBig = `1100px`;
    const animationHeader = `slide-from-top-animation` 
    const Container = styled.header`
        display: grid;
        justify-items: center;
        width: 100vw;
        backdrop-filter: blur(5px);
        align-items : center;
        position: sticky;
        background-color: ${colorBackgroundHeader};
        opacity: 0.7;
        overflow: hidden;
        color: black;
        grid-template-areas: 
            "logo nameofsite  navbutton" 
            " . input ."
            ". nav ."
        ;
        @media screen and (min-width: ${sizeScreenMiddle}) {
                grid-template-areas: "logo logo nameofsite input nav nav";
        }
        @media screen and (min-width: ${sizeScreenBig}) {
            grid-template-areas: "logo logo logo logo nameofsite nav nav input";
        }
    `
    
    const Image = styled.img`
        max-width: 3rem;
        max-height: 3rem;
        grid-area: logo;
        justify-items: start;

    `
    const Nav = styled.nav`
        justify-items: center;
        grid-area: nav;
        justify-self:stretch;
    `
    const NavButton = styled.button`
        margin-right: 10px;
        justify-items:end;
        grid-area:navbutton;
        @media screen and (min-width: 700px){
            display:none;
        }
    `
    const CustomLi = styled.li`
        border-top: solid white 1px;
        list-style-type: none;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        @media screen and (min-width: ${sizeScreenMiddle}) {
            border-top: none
        }
    `
    const UL = styled.ul`
        width: 100%;
        padding: 0;
        margin: 0;
        display:grid;
        height: 30vh;
        grid-template-rows: repeat(4, auto);
        grid-template-columns: none;
        grid-row-gap: 0;
        & > li:last-child{
            border-bottom: solid white 1px;
        }
        @media screen and (min-width: ${sizeScreenMiddle}) {
            grid-template-row: none;
            grid-template-columns: repeat(4,auto);
            height:100%;
            & > li:last-child{
                border-bottom: 0;
            }
        }

    `
    const A = styled.a`
        text-decoration: none;
        color: black;
        &:hover {
            color: ${color_over} ;
        }
    `
    const INPUT = styled.input`
        type:text;
        grid-area:input;
        justify-items: center;
        margin-bottom:1rem;
        margin-top:1rem;
        @media screen and (min-width: ${sizeScreenBig}) {
            place-items:center;
            margin-bottom:0;
        }
    `

    const NAMEOFSITE = styled.h1`
        grid-area:nameofsite;
        @media screen and (min-width: ${sizeScreenBig}) {

        }
    `
    
    export default function Header(){
        // state (etat,donnée)
        const [isBigScreen, setIsBigScreen] = useState(false);

        const [isNavVisible, setIsNavVisible] = useState(false);

        // comportements

        useEffect(() => {
            const mediaQuery = window.matchMedia(`(min-width:`+sizeScreenMiddle+`)`);
            
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

        const toggle = () => {
            console.log('AppuieBoutton');
            setIsNavVisible(!isNavVisible);
        }

        // affichage (render)
        return(
            <Container className={isNavVisible ? `${ animationHeader }` : ''}>
                <Image src={logo} />
                <NAMEOFSITE>Garage V.Parrot</NAMEOFSITE>
                <INPUT></INPUT>
                {(isNavVisible || isBigScreen) && (
                    <Nav className={`${animationHeader}`}>
                        <UL>
                            <CustomLi><A>Accueil</A></CustomLi>
                            <CustomLi><A>Nos Services</A></CustomLi>
                            <CustomLi><A>Voitures</A></CustomLi>
                            <CustomLi><A>Nous Conctatez</A></CustomLi>
                        </UL>
                    </Nav>
                )}
                <NavButton className={`bouton-hamburger`} onClick={toggle}></NavButton>
            </Container>
        )
    }