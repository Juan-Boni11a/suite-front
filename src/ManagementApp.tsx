import { Button, Card, Col, Row, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import HemerotecEntrypoint from "./HemerotecApp/pages/Entrypoint";
import TransportEntrypoint from "./TransportApp/TransportEntrypoint";
import { AuthContext } from "./context/AuthContext";
import UnauthenticatedNavigation from "./navigation/UnauthenticatedNavigation";
import AuthenticatedNavigation from "./navigation/AuthenticatedNavigation";


const ManagementApp = (): any => {
  const { isLogin, login, logout } = useContext(AuthContext);
  
  useEffect(() => {
    console.log('isLogin', isLogin)
    const sessionInfo = localStorage.getItem("userData");
    console.log('sessionINfo', sessionInfo)
    if (typeof sessionInfo !== "undefined" && sessionInfo !== null) {
      login(JSON.parse(sessionInfo));
    } else {
      logout()
      localStorage.clear();
    }
  }, []);

  

  if (!isLogin) {
    return (
      <UnauthenticatedNavigation />
    )
  }


  if (isLogin) {
    return (
      <AuthenticatedNavigation />
    )
  }

};

export default ManagementApp