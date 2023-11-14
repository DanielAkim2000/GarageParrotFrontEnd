import React from "react";
import { useState, useEffect } from "react";
import axios from "../../../Api/axios";
import { Loading, Paginator } from "../../../Components/Public";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import "../style.css";

const IndexUser = () => {
  // state (etats,donees)
  const [users, setUsers] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const token = localStorage.getItem("token");

  let navigate = useNavigate();

  // donnee pour les paginator
  let nombreElementPages = 5;
  const [debut, setDebut] = useState(0);
  const [fin, setFin] = useState(nombreElementPages);
  let dataMap = users.slice(debut, fin);

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
      if (newDebut <= users.length) setDebut(newDebut);
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

  const deleteEmploye = (user) => {
    const response = window.confirm("Voulez-vous continuer ?");
    if (response) {
      axios
        .delete(`/api/deleteEmploye/${user.id}`, {
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

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/employes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reload]);

  const goModify = (user) => {
    navigate("/Admin/User/Edit", { state: { utilisateur: user } });
  };

  return (
    <div className="table-responsive ">
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Prenom</th>
            <th scope="col">Nom</th>
            <th scope="col">Email</th>
            <th scope="col">Mot de Passe</th>
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
            dataMap.map((user) => (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <Button
                    className="m-1"
                    onClick={() => {
                      goModify(user);
                    }}
                  >
                    Modifier
                  </Button>
                  <Button
                    className="m-1"
                    onClick={() => {
                      deleteEmploye(user);
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
        data={users}
        nombreElementPages={nombreElementPages}
        changePage={changePage}
      />
    </div>
  );
};

export { IndexUser };
