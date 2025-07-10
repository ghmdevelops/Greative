import React from "react";
import { Link } from "react-router-dom";
import { FiLogIn, FiUserPlus } from "react-icons/fi";

function LandingPage() {
  return (
    <div
      className="landing-page min-vh-100 d-flex flex-column"
      style={{
        background: "linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%)",
        color: "#fff",
      }}
    >
      <header className="bg-transparent py-4 shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          <h3 className="fw-bold m-0">Greative</h3>
          <div className="d-flex gap-3">
            <Link
              to="/login"
              className="btn btn-outline-light d-flex align-items-center fw-semibold"
              style={{ borderRadius: "50px", padding: "0.5rem 1.5rem" }}
            >
              <FiLogIn size={20} />
              <span className="d-none d-md-inline ms-2">Login</span>
            </Link>
            <Link
              to="/registro"
              className="btn btn-light text-primary d-flex align-items-center fw-bold"
              style={{ borderRadius: "50px", padding: "0.5rem 1.8rem" }}
            >
              <FiUserPlus size={20} />
              <span className="d-none d-md-inline ms-2">Criar Conta</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-fill d-flex justify-content-center align-items-center">
        <div className="container text-center px-3 px-md-5">
          <h1
            className="display-4 fw-bold mb-3"
            style={{ textShadow: "0 2px 6px rgba(0,0,0,0.3)" }}
          >
            Transforme seu espaço com tecnologia inteligente
          </h1>
          <p
            className="lead mb-5"
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              textShadow: "0 1px 4px rgba(0,0,0,0.2)",
            }}
          >
            Monitore temperatura, umidade, amônia e muito mais com dashboards
            intuitivos e análises em tempo real.
          </p>
          <Link
            to="/registro"
            className="btn btn-light btn-lg fw-bold px-5 shadow"
            style={{ borderRadius: "50px" }}
          >
            Comece Agora
          </Link>

          <section className="d-flex flex-wrap justify-content-center mt-5 gap-4">
            <div
              className="bg-white bg-opacity-10 rounded-4 p-4 flex-grow-1"
              style={{
                maxWidth: "220px",
                minWidth: "180px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              }}
            >
              <i className="bi bi-thermometer-half fs-1 mb-3"></i>
              <h5>Monitoramento Preciso</h5>
              <p className="small">
                Dados confiáveis para decisões eficientes.
              </p>
            </div>
            <div
              className="bg-white bg-opacity-10 rounded-4 p-4 flex-grow-1"
              style={{
                maxWidth: "220px",
                minWidth: "180px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              }}
            >
              <i className="bi bi-bar-chart-line fs-1 mb-3"></i>
              <h5>Dashboards Inteligentes</h5>
              <p className="small">Visualize tudo de forma clara e prática.</p>
            </div>
            <div
              className="bg-white bg-opacity-10 rounded-4 p-4 flex-grow-1"
              style={{
                maxWidth: "220px",
                minWidth: "180px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              }}
            >
              <i className="bi bi-phone fs-1 mb-3"></i>
              <h5>Acesso em qualquer lugar</h5>
              <p className="small">Use no desktop, tablet ou celular.</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
