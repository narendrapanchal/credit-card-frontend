import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Header from "./Header";
import Footer from "./Footer";
import AddCard from "../pages/AddCard";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";
import CardDetail from "../pages/CardDetails";
import Apply from "../pages/Apply";
import Applications from "../pages/Applications";
import EditApplication from "../pages/EditApplication";
import UserContextProvider from "../context/userContext";
import NotFound from "../pages/NotFound";

function AllRoutes() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <div className="layout">
          <div>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/applications"
                element={
                  <PrivateRoute>
                    <Applications />
                  </PrivateRoute>
                }
              />
              <Route path="/card/:id" element={<CardDetail />} />
              <Route
                path="/application/:id"
                element={
                  <PrivateRoute>
                    <EditApplication />
                  </PrivateRoute>
                }
              />
              <Route path="/apply/:id" element={<Apply />} />
              <Route path="/admin/login" element={<h1>ADMIN / LOGIN</h1>} />
              <Route
                path="/add-card"
                element={
                  <PrivateRoute>
                    <AddCard />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFound/>} />
              {/* <Route path="/signup" element={<SignUp />} /> */}
            </Routes>
          </div>
          <Footer />
        </div>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default AllRoutes;
