/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Layout } from "antd";

import { SideBar } from "../../components/Sidebar";
import MovilizationOrderPage from "../../pages/MotilizationOrder";
import SolicitudTransportPage from "../../pages/SolicitudTransport";
import { AuthContext } from "../../../context/AuthContext";


function WelcomePage() {
  return(
    <h3>Bienvenido!</h3>
  )
}



const AuthenticatedNavigation = () => {

  return (
    <>
      <Layout>
        <SideBar>
          <Routes>
            <Route path="" element={<WelcomePage />} />
            <Route path="movilizationOrders" element={<MovilizationOrderPage />} />
            <Route path="solicitudTransport" element={<SolicitudTransportPage />} />
          </Routes>
        </SideBar>
      </Layout>

    </>
  );
};

export default AuthenticatedNavigation;