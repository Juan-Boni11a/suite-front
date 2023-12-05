/* eslint-disable react-hooks/exhaustive-deps */
//import { Routes, Route, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Layout } from "antd";

/*import { AuthContext } from "../../context/AuthContext";
import PaymentsPage from "../../pages/Payments";
import UsersPage from "../../pages/Users";

import NavigationComponent from "../../components/Navigation";
import SchoolsPage from "../../pages/Schools";
import ProgramsPage from "../../pages/Programs";
*/


const AuthenticatedNavigation = () => {

  /*const navigate = useNavigate();
  const { user }: any = useContext(AuthContext);
  

  useEffect(() => {
    user && navigate("/escuelas");
  }, []);


  return (
    <>
      <Layout>
        <NavigationComponent>
          <Routes>
            <Route path="escuelas" element={<SchoolsPage />} />
            <Route path="programas" element={<ProgramsPage />} />
            <Route path="pagos" element={<PaymentsPage />} />
            <Route path="usuarios" element={<UsersPage />} />
          </Routes>
        </NavigationComponent>
      </Layout>

    </>
  );*/

  return( <h3>AUTHENTICATED</h3> )
};

export default AuthenticatedNavigation;