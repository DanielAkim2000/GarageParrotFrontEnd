import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header.jsx';
import styled,{ css } from 'styled-components';
import { HashRouter,Routes,Route,Switch  } from "react-router-dom";
import { Home } from './Pages/Home';



const Container = styled.div`
  display: flex;
  flex-direction: column;
  `

function App() {
  return(
    <Container>
      <Routes>
          <Route exact path="/" element={<Home/>} /> {/* 👈 Renders at /#/app/ */}
          <Route path="/index" element={<div></div>} /> {/* 👈 Renders at /#/app/ */}
      </Routes>
      <footer></footer>  
    </Container>
      
  )
    
}

export default App;
