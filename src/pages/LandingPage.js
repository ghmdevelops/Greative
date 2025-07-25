import { BsWhatsapp } from "react-icons/bs";
import React from "react";
import { Link } from "react-router-dom";
import { FiLogIn, FiUserPlus } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";

function LandingPage() {
  const handleAgendar = () => {
    console.log("Usuário clicou em Agendar Demonstração");
    alert("Obrigado! Entraremos em contato em breve. 😊");
  };

  const handleFaqClick = (pergunta) => {
    console.log("Pergunta visualizada:", pergunta);
  };

  const handleContatoWhats = () => {
    window.open("https://wa.me/5599999999999", "_blank");
  };

  return (
    <div
      className="landing-page min-vh-100 d-flex flex-column"
      style={{
        background: "linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%)",
        color: "#fff",
        position: "relative",
      }}
    >
      <header className="bg-transparent py-4 shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          <h3 className="fw-bold m-0">Greative</h3>
          <div className="d-flex gap-3">
            <Link
              to="/login"
              className="btn btn-outline-light d-flex align-items-center fw-semibold"
            >
              <FiLogIn size={20} />
              <span className="ms-2">Login</span>
            </Link>
            <Link
              to="/registro"
              className="btn btn-light text-primary d-flex align-items-center fw-bold"
            >
              <FiUserPlus size={20} />
              <span className="ms-2">Criar Conta</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-fill d-flex align-items-center text-center px-3">
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">
            Transforme seu espaço com tecnologia inteligente
          </h1>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: "600px" }}>
            Monitore temperatura, umidade, amônia e muito mais com dashboards
            intuitivos e análises em tempo real.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
            <button
              onClick={handleAgendar}
              className="btn btn-light btn-lg fw-bold px-5 shadow rounded-pill"
            >
              Agendar Demonstração
            </button>

            <Link
              to="/orcamento"
              className="btn btn-light btn-lg fw-bold px-5 shadow rounded-pill text-decoration-none"
            >
              Solicitar Orçamento
            </Link>
          </div>
        </div>
      </main>

      <section className="container my-5 text-center">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="bg-white bg-opacity-10 rounded-4 p-4">
              <i className="bi bi-thermometer-half fs-1 mb-3"></i>
              <h5>Monitoramento Preciso</h5>
              <p>Dados confiáveis para decisões eficientes.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-white bg-opacity-10 rounded-4 p-4">
              <i className="bi bi-bar-chart-line fs-1 mb-3"></i>
              <h5>Dashboards Inteligentes</h5>
              <p>Visualize tudo de forma clara e prática.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-white bg-opacity-10 rounded-4 p-4">
              <i className="bi bi-phone fs-1 mb-3"></i>
              <h5>Acesso Remoto</h5>
              <p>Use no desktop, tablet ou celular.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="bg-white text-dark py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">O que nossos clientes dizem</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-3 border rounded">
                <p>
                  “Simplesmente revolucionário! Hoje tomo decisões com base em
                  dados confiáveis.”
                </p>
                <strong>— João L., Produtor</strong>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 border rounded">
                <p>
                  “Acesso fácil pelo celular e suporte excelente. Recomendo
                  muito!”
                </p>
                <strong>— Carla M., Técnica</strong>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 border rounded">
                <p>
                  “A solução perfeita para controlar o ambiente dos meus
                  animais.”
                </p>
                <strong>— Sérgio A., Zootecnista</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container my-5">
        <h2 className="text-center fw-bold mb-4">Perguntas Frequentes</h2>
        <div className="accordion" id="faqAccordion">
          {[
            {
              pergunta: "Preciso de internet para usar?",
              resposta:
                "Sim, é necessário ter uma conexão com a internet para enviar os dados em tempo real.",
            },
            {
              pergunta: "Funciona em áreas rurais?",
              resposta:
                "Sim! Basta ter conexão com a internet via Wi-Fi ou 4G.",
            },
            {
              pergunta: "Qual o custo mensal?",
              resposta:
                "Temos planos a partir de R$39,90. Você escolhe conforme sua necessidade.",
            },
          ].map((item, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  onClick={() => handleFaqClick(item.pergunta)}
                >
                  {item.pergunta}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">{item.resposta}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-dark text-white text-center py-4 mt-auto">
        <div className="container">
          <p className="mb-1">
            &copy; {new Date().getFullYear()} Greative. Todos os direitos
            reservados.
          </p>
          <small>
            <a
              href="/privacidade"
              className="text-white text-decoration-underline me-2"
            >
              Política de Privacidade
            </a>
            <a href="/termos" className="text-white text-decoration-underline">
              Termos de Uso
            </a>
          </small>
        </div>
      </footer>

      <button
        onClick={handleContatoWhats}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          borderRadius: "50%",
          backgroundColor: "#25D366",
          border: "none",
          width: "60px",
          height: "60px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BsWhatsapp size={28} color="#fff" />
      </button>
    </div>
  );
}

export default LandingPage;
