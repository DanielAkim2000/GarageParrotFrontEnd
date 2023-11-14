import React from "react";
import { useState, useEffect } from "react";
import axios from "../../../Api/axios.jsx";
import { Loading, Paginator } from "../../../Components/Public";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button.js";
import "../style.css";

const IndexServices = () => {
  // state (etats,donees)
  const [services, setservices] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // donnee pour les paginator
  let nombreElementPages = 5;
  const [debut, setDebut] = useState(0);
  const [fin, setFin] = useState(nombreElementPages);
  let dataMap = services.slice(debut, fin);

  //Comportements
  const changePage = (e) => {
    // Element suivant
    if (
      e.target.getAttribute("data-testid") === "NavigateNextIcon" ||
      e.target.getAttribute("d") ===
        "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" ||
      e.target.getAttribute("aria-label") === "Go to next page"
    ) {
      let newDebut = debut + nombreElementPages;
      let newFin = newDebut + nombreElementPages;
      if (newDebut >= 0) {
        setDebut(newDebut);
        setFin(newFin);
      }
    }
    // Element precedent
    if (
      e.target.getAttribute("data-testid") === "NavigateBeforeIcon" ||
      e.target.getAttribute("d") ===
        "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" ||
      e.target.getAttribute("aria-label") === "Go to previous page"
    ) {
      let newDebut = debut - nombreElementPages;
      let newFin = newDebut + nombreElementPages;
      if (newDebut <= services.length) setDebut(newDebut);
      setFin(newFin);
    }
    // Element nombre
    if (!isNaN(parseInt(e.target.textContent))) {
      const newDebut =
        (parseInt(e.target.textContent) - 1) * nombreElementPages;
      const newFin = newDebut + nombreElementPages;
      setDebut(newDebut);
      setFin(newFin);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/servicesAdmin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setservices(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reload]);

  const goModify = (service) => {
    navigate("/Admin/Services/Edit", { state: { services: service } });
  };

  const deleteService = (service) => {
    const response = window.confirm("Voulez-vous continuer ?");
    if (response) {
      axios
        .delete(`/api/deleteService/${service.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          setReload(!reload);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div className="table-responsive ">
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nom</th>
            <th scope="col">Description</th>
            <th scope="col">Image</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6">
                <Loading />
              </td>
            </tr>
          ) : dataMap ? (
            dataMap.map((service) => (
              <tr key={service.id}>
                <th scope="row">{service.id}</th>
                <td>{service.nom}</td>
                <td>{service.description}</td>
                <td className="image-cell">
                  <img
                    src={service.image}
                    alt={service.nom}
                    className="img-fluid img-thumbnail"
                  />
                </td>
                <td>
                  <Button
                    className="m-1"
                    onClick={() => {
                      goModify(service);
                    }}
                  >
                    Modifier
                  </Button>
                  <Button
                    className="m-1"
                    onClick={() => {
                      deleteService(service);
                    }}
                  >
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Error</td>
            </tr>
          )}
        </tbody>
      </table>
      <Paginator
        data={services}
        nombreElementPages={nombreElementPages}
        changePage={changePage}
      />
    </div>
  );
};

export { IndexServices };
