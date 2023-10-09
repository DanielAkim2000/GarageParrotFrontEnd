import styled,{ css } from 'styled-components'
import logo from '../../Logo.png'
import React, { useEffect,useState } from 'react';
import '../../Styles/Header.css';

    const color_over = `rgba(20, 116, 199)`;
    const colorBackgroundHeader = `black`;
    const sizeScreenMiddle = `700px`;
    const sizeScreenBig = `1100px`;
    const animationHeader = `slide-from-top-animation` 
    const Container = styled.header`
        display: grid;
        justify-content: space-between;
        width: 100vw;
        backdrop-filter: blur(5px);
        align-items : center;
        position: fixed;
        background-color: ${colorBackgroundHeader};
        opacity: 0.7;
        overflow: hidden;
        color: white;
        grid-template-areas: "logo navbutton" "nav nav";
        @media screen and (min-width: ${sizeScreenMiddle}) {
                grid-template-areas: "logo logo nav nav";
        }
        @media screen and (min-width: ${sizeScreenBig}) {
            grid-template-areas: "logo logo logo logo nav nav";
        }
    `
    
    const Image = styled.img`
        max-width: 3rem;
        max-height: 3rem;
        grid-area: logo;

    `
    const Nav = styled.nav`
        justify-items: center;
        grid-area: nav;
    `
    const NavButton = styled.button`
        margin-right: 10px;
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
        &:hover {
            color: ${color_over} ;
        }
    `
    
    export default function Header(){
        const [isBigScreen, setIsBigScreen] = useState(false);
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

            // 
        const [isNavVisible, setIsNavVisible] = useState(false);
            
            //Changement au niveau de l'ecran
        const toggle = () => {
            console.log('AppuieBoutton');
            setIsNavVisible(!isNavVisible);
        }
        return(
            <Container className={isNavVisible ? `${ animationHeader }` : ''}>
                <Image src={logo} />
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