import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!login?.token) {
      navigate("/login");
    }
  }, []);
  return <>{children}</>;
}

export default PrivateRoute;
