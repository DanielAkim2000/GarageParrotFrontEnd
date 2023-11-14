import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { accountService } from "../services/account.services";

const AuthGuard = ({ children }) => {
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const checkTokenExpirationInterval = setInterval(() => {
      if (!accountService.isLogged()) {
        setExpired(true);
        clearInterval(checkTokenExpirationInterval);
      }
    }, 3600);

    return () => clearInterval(checkTokenExpirationInterval);
  }, []);

  if (expired) {
    return <Navigate to="/Login" />;
  }

  if (!accountService.isLogged()) {
    return <Navigate to="/Login" />;
  }

  return children;
};

export default AuthGuard;
