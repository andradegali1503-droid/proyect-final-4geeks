import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Menu from "../pages/Menu";
import Reserve from "../pages/Reserve";
import MyReservations from "../pages/MyReservations";
import Reviews from "../pages/Reviews";
import AdminDashboard from "../pages/AdminDashboard";

function ContenidoDelRouter() {
  const ubicacion = useLocation();
  const esInicio = ubicacion.pathname === "/";

  return (
    <div className="contenedor-principal d-flex flex-column">
      <Navbar />

      <main className={`${esInicio ? "container-fluid p-0" : "container py-4"} flex-grow-1`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Signup />} />
          <Route path="/menu" element={<Menu />} />
          <Route
            path="/reservar"
            element={
              <PrivateRoute>
                <Reserve />
              </PrivateRoute>
            }
          />
          <Route
            path="/mis-reservas"
            element={
              <PrivateRoute>
                <MyReservations />
              </PrivateRoute>
            }
          />
          <Route path="/reviews" element={<Reviews />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function AppRouter() {
  return (
    <BrowserRouter>
      <ContenidoDelRouter />
    </BrowserRouter>
  );
}

export default AppRouter;
