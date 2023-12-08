/* eslint-disable react-hooks/exhaustive-deps */
//import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import TransportEntrypoint from "../../TransportApp/TransportEntrypoint";
import HemerotecEntrypoint from "../../HemerotecApp/pages/Entrypoint";
import UsersPage from "../../pages/GeneralManagement/Users";
import SelectionPage from "../../pages/Selection";
import GeneralManagement from "../../pages/GeneralManagement";




const AuthenticatedNavigation = () => {

  const navigate = useNavigate();


  useEffect(() => {
    navigate("/selection");
  }, []);


  return (
    <Routes>
      <Route path="selection" element={<SelectionPage />} />
      <Route path="transports/*" element={<TransportEntrypoint />} />
      <Route path="hemerotec/*" element={<HemerotecEntrypoint />} />
      <Route path="usersManagement" element={<UsersPage />} />
    </Routes>

  );

};

export default AuthenticatedNavigation;