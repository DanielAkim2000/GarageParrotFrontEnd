import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header.js';
import SlideBar from './Components/SlideBar/SlideBar.js'
import styled,{ css } from 'styled-components'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  `


function App() {
  return(
    <Container>
      <Header/>
      <main>
        <SlideBar/>
      </main>
    </Container>
  )
    
}

export default App;
