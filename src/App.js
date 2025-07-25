import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import SalaDetalhe from "./pages/SalaDetalhe";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import RecuperarSenha from "./pages/RecuperarSenha";
import PrivateRoute from "./components/PrivateRoute";
import Perfil from "./pages/Perfil";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Orcamento from "./pages/Orcamento";
import "./App.css";

function App() {
  // const [theme, setTheme] = useState("light");

  // useEffect(() => {
  //   const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  //   const applyThemeClass = (newTheme) => {
  //     const html = document.documentElement;
  //     if (newTheme === "dark") {
  //       html.classList.add("dark");
  //       html.classList.remove("light");
  //     } else {
  //       html.classList.add("light");
  //       html.classList.remove("dark");
  //     }
  //   };

  //   const handleChange = (e) => {
  //     const newTheme = e.matches ? "dark" : "light";
  //     setTheme(newTheme);
  //     applyThemeClass(newTheme);
  //   };

  //   const initialTheme = mediaQuery.matches ? "dark" : "light";
  //   setTheme(initialTheme);
  //   applyThemeClass(initialTheme);
  //   mediaQuery.addEventListener("change", handleChange);

  //   return () => mediaQuery.removeEventListener("change", handleChange);
  // }, []);

  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/sala/:id"
            element={
              <PrivateRoute>
                <SalaDetalhe />
              </PrivateRoute>
            }
          />
          <Route
            path="/perfil"
            element={
              <PrivateRoute>
                <Perfil />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/:id"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/welcome" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/recuperar" element={<RecuperarSenha />} />
          <Route path="/orcamento" element={<Orcamento />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
