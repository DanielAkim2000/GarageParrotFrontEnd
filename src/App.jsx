import './App.css';
import styled from 'styled-components';
import { Routes,Route } from "react-router-dom";
import AdminRouter from './Router/AdminRouter';
import PublicRouter from './Router/PublicRouter';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  `

function App() {
  // state (etats et donnees)
  return(
    <Container>
      <Routes>
        <Route path='/*' element={<PublicRouter />} />
        <Route path='/Admin/*' element={<AdminRouter />} />
      </Routes>  
    </Container>
      
  )
    
}

export default App;
