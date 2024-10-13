import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Header from "./Header";
import Footer from "./Footer";
import AddCard from "../pages/AddCard";
import PrivateRoute from "./PrivateRoute";

function AllRoutes() {
  return (
    <BrowserRouter>
      <div className="layout">
        <div>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/add-card"
              element={
                  <AddCard />
              }
            />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default AllRoutes;
