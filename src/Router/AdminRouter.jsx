import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../Pages/Admin/Home.jsx";
import { Error } from "../_utils/Error.jsx";
import LayoutAdmin from "../Pages/Admin/LayoutAdmin.jsx";
import {
  AddUser,
  DeleteUser,
  EditUser,
  IndexContact,
  IndexUser,
} from "../Pages/Admin/";
import {
  AddServices,
  DeleteServices,
  EditServices,
  IndexServices,
} from "../Pages/Admin/";
import {
  AddVoitures,
  DeleteVoitures,
  EditVoitures,
  IndexVoitures,
} from "../Pages/Admin/";
import { DeleteAvis, EditAvis, IndexAvis } from "../Pages/Admin/";
import {
  AddHoraires,
  DeleteHoraires,
  EditHoraires,
  IndexHoraires,
} from "../Pages/Admin";
import { AddAvis } from "../Pages/Admin/Avis/AddAvis.jsx";

export default function AdminRouter() {
  return (
    <Routes>
      <Route element={<LayoutAdmin />}>
        <Route index element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/User">
          <Route index element={<IndexUser />} />

          <Route path="/User/Add" element={<AddUser />} />
          <Route path="/User/Edit" element={<EditUser />} />
          <Route path="/User/Delete" element={<DeleteUser />} />
          <Route path="/User/Index" element={<IndexUser />} />
        </Route>
        <Route path="/Services">
          <Route index element={<IndexServices />} />

          <Route path="/Services/Add" element={<AddServices />} />
          <Route path="/Services/Edit" element={<EditServices />} />
          <Route path="/Services/Delete" element={<DeleteServices />} />
          <Route path="/Services/Index" element={<IndexServices />} />
        </Route>
        <Route path="/Voitures">
          <Route index element={<IndexVoitures />} />

          <Route path="/Voitures/Add" element={<AddVoitures />} />
          <Route path="/Voitures/Edit" element={<EditVoitures />} />
          <Route path="/Voitures/Delete" element={<DeleteVoitures />} />
          <Route path="/Voitures/Index" element={<IndexVoitures />} />
        </Route>
        <Route path="/Avis">
          <Route index element={<IndexAvis />} />

          <Route path="/Avis/Add" element={<AddAvis />} />
          <Route path="/Avis/Edit" element={<EditAvis />} />
          <Route path="/Avis/Delete" element={<DeleteAvis />} />
          <Route path="/Avis/Index" element={<IndexAvis />} />
        </Route>
        <Route path="/Horaires">
          <Route index element={<IndexHoraires />} />

          <Route path="/Horaires/Add" element={<AddHoraires />} />
          <Route path="/Horaires/Edit" element={<EditHoraires />} />
          <Route path="/Horaires/Delete" element={<DeleteHoraires />} />
          <Route path="/Horaires/Index" element={<IndexHoraires />} />
        </Route>
        <Route path="/Contacts">
          <Route index element={<IndexContact />} />

          <Route path="/Contacts/Index" element={<IndexContact />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}
