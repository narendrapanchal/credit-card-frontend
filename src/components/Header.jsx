import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

function Header() {
  const { login, handleLogout } = useContext(UserContext);
  return (
    <header className="bg-gradient-to-r from-[rgb(30,41,59)] to-[rgb(75,85,99)] text-white w-full py-4  ">
      <div className="container flex justify-between ">
        <h2 className="text-xl">
          <Link to="/">Trending Cards {login?.token && "| Admin"}</Link>
        </h2>
        <ul className="flex justify-between gap-6 ">
          {login?.token && (
            <li>
              <Link data-test="add-card" to="/add-card">Add Card</Link>
            </li>
          )}
          {login?.token && (
            <li>
              <Link data-test="applications" to="/applications">Applications</Link>
            </li>
          )}
          {login?.token && <button onClick={handleLogout} data-test="logout">Logout</button>}
        </ul>
      </div>
    </header>
  );
}

export default Header;
