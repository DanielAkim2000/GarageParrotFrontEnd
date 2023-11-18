import { Routes, Route } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import axios from "../Api/axios";
import { Error } from "../_utils/Error.jsx";
import {
  Home,
  Services,
  Voitures,
  NousContacter,
  Avis,
  Layout,
  VoituresShow,
  ServiceShow,
} from "../Pages/Public";
import { Login } from "../Pages/Login";

export default function PublicRouter() {
  // state (etats et donnees)
  const [services, setServices] = useState([{}]);
  const [voitures, setVoitures] = useState([{}]);
  const [temoignages, setTemoignages] = useState([{}]);
  const [horaires, setHoraires] = useState([{}]);

  // comportements

  useEffect(() => {
    axios
      .get("/api/services")
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("/api/voitures")
      .then((response) => {
        setVoitures(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("/api/temoignages")
      .then((response) => {
        let temoignages = response.data;
        let data = [];
        temoignages.forEach((temoignage) => {
          if (temoignage.modere) {
            data.push(temoignage);
          }
        });
        setTemoignages(data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("/api/horaires")
      .then((response) => {
        setHoraires(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Routes>
      <Route element={<Layout horaires={horaires} />}>
        <Route
          index
          element={
            <Home
              voitures={voitures}
              services={services}
              temoignages={temoignages}
            />
          }
        />
        <Route path="/Login" element={<Login />} />
        <Route
          path="/Home"
          element={
            <Home
              voitures={voitures}
              services={services}
              temoignages={temoignages}
            />
          }
        />{" "}
        {/* 👈 Renders at /#/app/ */}
        <Route
          path="/Services"
          element={<Services services={services} temoignages={temoignages} />}
        />{" "}
        {/* 👈 Renders at /#/app/ */}
        <Route
          path="/Voitures"
          element={<Voitures voitures={voitures} />}
        />{" "}
        <Route path="VoituresDetails" element={<VoituresShow />} />
        <Route path="ServicesDetails" element={<ServiceShow />} />
        {/* 👈 Renders at /#/app/ */}
        <Route path="/NousContacter" element={<NousContacter />} />{" "}
        {/* 👈 Renders at /#/app/ */}
        <Route path="/Avis" element={<Avis />} /> {/* 👈 Renders at /#/app/ */}
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}
