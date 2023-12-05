import { useContext, useEffect } from "react";
import AuthenticatedNavigation from "../navigation/AuthenticatedNavigation";
import { AuthContext } from "../../context/AuthContext";

const TransportApp = (): any => {
    const { isLogin } = useContext(AuthContext);

    if (isLogin) return <AuthenticatedNavigation />

};

export default TransportApp