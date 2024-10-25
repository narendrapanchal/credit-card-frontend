import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(
    { token: Cookies.get("token") } || null
  );

  const handleLogin = (data) => {
    const token = "Bearer " + data;
    Cookies.set("token", token, { expires: 1 }); 
    setLogin({ token });
  };

  const handleLogout = () => {
    setLogin(null);
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <UserContext.Provider value={{ handleLogin, login, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
