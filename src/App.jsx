import "./App.css";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import AdminRouter from "./Router/AdminRouter";
import PublicRouter from "./Router/PublicRouter";
import AuthGuard from "./_helpers/AuthGuard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  width: 100vw;
`;

function App() {
  // state (etats et donnees)
  return (
    <Container>
      <Routes>
        <Route path="/*" element={<PublicRouter />} />
        <Route
          path="/Admin/*"
          element={
            <AuthGuard>
              <AdminRouter />
            </AuthGuard>
          }
        />
      </Routes>
    </Container>
  );
}

export default App;
