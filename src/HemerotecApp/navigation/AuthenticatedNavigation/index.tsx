/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Layout } from "antd";

import { SideBar } from "../../components/Sidebar";
import { AuthContext } from "../../../context/AuthContext";
import RegisterNoticiasPage from "../../pages/RegisterNoticiasPage";
import Dashboard from "../../pages/Dashboard";


function WelcomePage() {
  return (
    <h3>Bienvenido!</h3>
  )
}



const AuthenticatedNavigation = () => {
  const { user }: any = useContext(AuthContext)

  console.log('USER', user)


  // const isSuperAdmin = user.roles.filter((role: any) => role.id === 1)

  return (
    <>
      <Layout>
        <SideBar>
          <Routes>
            <Route path="" element={<Dashboard />} />
            <Route path="noticias" element={<RegisterNoticiasPage />} />
         
          </Routes>
        </SideBar>
      </Layout>

    </>
  );
};

export default AuthenticatedNavigation;