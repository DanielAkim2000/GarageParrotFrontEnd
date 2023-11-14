import React, { useEffect, useState } from "react";
import axios from "../../../Api/axios.jsx";
import { Etoiles, Switch } from "../../../Components/Admin";
import { Paginator, Loading } from "../../../Components/Public";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button.js";
import "../style.css";

const IndexAvis = () => {
  // state (etats,donees)
  const [avis, setAvis] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);

  const token = localStorage.getItem("token");

  // donnee pour les paginator
  let nombreElementPages = 5;
  const [debut, setDebut] = useState(0);
  const [fin, setFin] = useState(nombreElementPages);
  let dataMap = avis.slice(debut, fin);

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
      if (newDebut <= avis.length) setDebut(newDebut);
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
      .get("/api/temoignages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAvis(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reload]);
  const goModify = (avi) => {
    navigate("/Admin/Avis/Edit", { state: { avis: avi } });
  };
  const deleteTemoignage = (avi) => {
    const response = window.confirm("Voulez-vous continuer ?");
    if (response) {
      axios
        .delete(`/api/deleteTemoignage/${avi.id}`, {
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
            <th scope="col">Commentaire</th>
            <th scope="col">Note</th>
            <th scope="col">Modere</th>
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
            dataMap.map((avi) => (
              <tr key={avi.id}>
                <th scope="row">{avi.id}</th>
                <td>{avi.nom}</td>
                <td>{avi.commentaire}</td>
                <td>
                  <Etoiles note={avi.note} />
                </td>
                <td>
                  <Switch bool={avi.modere} />
                </td>
                <td>
                  <Button
                    className="m-1"
                    onClick={() => {
                      goModify(avi);
                    }}
                  >
                    Modifier
                  </Button>
                  <Button
                    className="m-1"
                    onClick={() => {
                      deleteTemoignage(avi);
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
        data={avis}
        nombreElementPages={nombreElementPages}
        changePage={changePage}
      />
    </div>
  );
};

export { IndexAvis };
