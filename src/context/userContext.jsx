import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(
    { token: localStorage.getItem("token") } || null
  );
  const handleLogin = (data) => {
    localStorage.setItem("token", "Bearer " + data);
    setLogin({ token: "Bearer " + data });
  };
  const handleLogout = () => {
    setLogin(null);
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <UserContext.Provider value={{ handleLogin, login, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
