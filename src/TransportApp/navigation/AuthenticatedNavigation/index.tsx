/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Layout } from "antd";

import { SideBar } from "../../components/Sidebar";
import MovilizationOrderPage from "../../pages/MotilizationOrder";
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
          </Routes>
        </SideBar>
      </Layout>

    </>
  );
};

export default AuthenticatedNavigation;