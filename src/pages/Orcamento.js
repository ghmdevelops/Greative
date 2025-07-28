import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiLogIn, FiUserPlus, FiUser, FiMail, FiPhone, FiMapPin, FiActivity, FiSquare, FiPackage, FiMessageCircle, FiLayers, FiGrid, FiCalendar } from "react-icons/fi";
import { FaFileInvoiceDollar } from "react-icons/fa";

export default function Orcamento() {
  const navigate = useNavigate();

  const [local, setLocal] = useState("");
  const [cep, setCep] = useState("");
  const [bairro, setBairro] = useState("");
  const [estado, setEstado] = useState("");
  const [cultivo, setCultivo] = useState("");
  const [tipoAbertoFechado, setTipoAbertoFechado] = useState("Aberto");
  const [tipoCultivo, setTipoCultivo] = useState("Hidroponia");
  const [area, setArea] = useState("");
  const [tipoAcaro, setTipoAcaro] = useState("");
  const [quantidadeAcaros, setQuantidadeAcaros] = useState("");
  const [objetivoUso, setObjetivoUso] = useState("");
  const [foraDeSP, setForaDeSP] = useState(false);
  const [dataAplicacao, setDataAplicacao] = useState("");

  const handleEnviar = (e) => {
    e.preventDefault();

    if (estado !== "SP") {
      alert("No momento, só atendemos o estado de SP.");
      return;
    }

    alert("Orçamento enviado! Entraremos em contato em breve.");
    navigate("/welcome");
  };

  const acaros = area && !isNaN(area) ? Math.round(parseFloat(area) * 15) : 0;

  async function handleCepBlur(e) {
    const valorCep = e.target.value.replace(/\D/g, "");
    setCep(valorCep);
    if (valorCep.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${valorCep}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setLocal(data.localidade || "");
          setBairro(data.bairro || "");
          setEstado(data.uf || "");

          if (data.uf !== "SP") {
            setForaDeSP(true);
          } else {
            setForaDeSP(false);
          }
        } else {
          alert("CEP não encontrado");
          setLocal("");
          setBairro("");
          setEstado("");
          setForaDeSP(false);
        }
      } catch {
        alert("Erro ao buscar CEP");
        setLocal("");
        setBairro("");
        setEstado("");
      }
    }
  }

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{
        background: "linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%)",
        color: "#000",
      }}
    >
      <style>{`
      body {
  font-family: 'Inter', sans-serif;
}

.form-control,
.form-select {
  border-radius: 0.9rem;
  transition: all 0.3s ease-in-out;
  font-size: 0.95rem;
}

.form-control:focus,
.form-select:focus {
  box-shadow: 0 0 0 0.25rem rgba(78, 84, 200, 0.25);
  border-color: #4e54c8;
}

.input-group-text {
  border-radius: 0.9rem 0 0 0.9rem;
  background-color: #f3f5fc;
  color: #4e54c8;
}

.btn-primary {
  background: linear-gradient(to right, #4e54c8, #8f94fb);
  border: none;
  border-radius: 1rem;
  transition: 0.3s ease-in-out;
}

.btn-primary:hover {
  box-shadow: 0 8px 18px rgba(78, 84, 200, 0.4);
  background: linear-gradient(to right, #3b40b5, #7379e0);
}

textarea.form-control {
  resize: none;
}

input[readonly] {
  background-color: #f8f9fc;
  color: #495057;
}

.badge.bg-primary {
  font-weight: 600;
  font-size: 1rem;
  border-radius: 0.75rem;
  background-color: #4e54c8 !important;
  transition: all 0.3s ease-in-out;
}

.shadow-blur {
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08) !important;
}

h2.text-primary {
  font-size: 2rem;
  letter-spacing: 0.5px;
}

h2.text-primary {
  font-size: 2rem;
  position: relative;
  display: inline-block;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
}

h2.text-primary::after {
  content: '';
  display: block;
  width: 60%;
  height: 3px;
  background: linear-gradient(to right, #4e54c8, #8f94fb);
  margin: 6px auto 0;
  border-radius: 5px;
}
  
        .form-control, .form-select {
          border-radius: 0.8rem;
          transition: all 0.3s ease;
        }
        .form-control:focus, .form-select:focus {
          box-shadow: 0 0 0 0.2rem rgba(78, 84, 200, 0.25);
          border-color: #4e54c8;
        }
        .input-group-text {
          border-radius: 0.8rem 0 0 0.8rem;
          background-color: #f1f3f9;
        }
        .btn-primary {
          background: linear-gradient(to right, #4e54c8, #8f94fb);
          border: none;
          border-radius: 0.8rem;
          color: #ffffff;
        }
        .btn-primary:hover {
          background: linear-gradient(to right, #3b40b5, #7379e0);
        }
      `}</style>

      <header className="bg-transparent py-4">
        <div className="container d-flex justify-content-between align-items-center">
          <Link to="/welcome" style={{ textDecoration: "none" }}>
            <h3 className="text-white fw-bold">Greative</h3>
          </Link>
          <div className="d-flex gap-3">
            <Link to="/login" className="btn btn-outline-light d-flex align-items-center fw-semibold">
              <FiLogIn size={20} />
              <span className="ms-2">Login</span>
            </Link>
            <Link to="/registro" className="btn btn-light text-primary fw-bold d-flex align-items-center">
              <FiUserPlus size={20} />
              <span className="ms-2">Criar Conta</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="container my-5 flex-grow-1 d-flex align-items-center justify-content-center">
        <form
          onSubmit={handleEnviar}
          className="bg-white rounded-4 shadow-lg p-4 p-md-5 w-100"
          style={{
            maxWidth: 1000,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="text-center">
            <div className="d-inline-flex align-items-center px-4 py-2 rounded-pill shadow-sm bg-light">
              <FaFileInvoiceDollar size={32} className="text-primary me-2" />
              <h2 className="mb-0 text-primary fw-semibold" style={{ fontSize: "1.8rem" }}>
                Solicitar Orçamento
              </h2>
            </div>
            <p className="text-muted mt-2" style={{ fontSize: "0.95rem" }}>
              Preencha com tranquilidade. Retornaremos em até 24h com sua proposta.
            </p>
          </div>

          <div className="row g-3 mb-3">
            {[
              { id: "nome", label: "Nome", icon: <FiUser />, type: "text", placeholder: "Nome" },
              { id: "email", label: "Email", icon: <FiMail />, type: "email", placeholder: "Email" },
              { id: "telefone", label: "Telefone", icon: <FiPhone />, type: "tel", placeholder: "Telefone" }
            ].map((field, idx) => (
              <div className="col-md-4" key={idx}>
                <label htmlFor={field.id} className="form-label">{field.label}</label>
                <div className="input-group">
                  <span className="input-group-text">{field.icon}</span>
                  <input type={field.type} id={field.id} className="form-control" placeholder={field.placeholder} required />
                </div>
              </div>
            ))}
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <label htmlFor="cep" className="form-label">CEP</label>
              <div className="input-group">
                <span className="input-group-text"><FiMapPin /></span>
                <input type="text" id="cep" className="form-control" value={cep} maxLength={9} onChange={(e) => setCep(e.target.value)} onBlur={handleCepBlur} placeholder="CEP" required />
              </div>
            </div>
            <div className="col-md-4">
              <label className="form-label">Bairro</label>
              <input type="text" className="form-control" value={bairro} readOnly />
            </div>
            <div className="col-md-4">
              <label className="form-label">Estado</label>
              <input type="text" className="form-control" value={estado} readOnly />
              {foraDeSP && (
                <div className="alert alert-warning mt-2 p-2" role="alert">
                  Ainda não atendemos sua região fora de SP.
                </div>
              )}
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label">Local (cidade)</label>
              <div className="input-group">
                <span className="input-group-text"><FiMapPin /></span>
                <input type="text" className="form-control" value={local} onChange={(e) => setLocal(e.target.value)} placeholder="Cidade" required />
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Cultivo</label>
              <div className="input-group">
                <span className="input-group-text"><FiActivity /></span>
                <input type="text" className="form-control" value={cultivo} onChange={(e) => setCultivo(e.target.value)} placeholder="Ex: morango, alface" required />
              </div>
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label">Ambiente</label>
              <div className="input-group">
                <span className="input-group-text"><FiLayers /></span>
                <select className="form-select" value={tipoAbertoFechado} onChange={(e) => setTipoAbertoFechado(e.target.value)} required>
                  <option value="Aberto">Aberto</option>
                  <option value="Fechado">Fechado</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Tipo de Cultivo</label>
              <div className="input-group">
                <span className="input-group-text"><FiGrid /></span>
                <select className="form-select" value={tipoCultivo} onChange={(e) => setTipoCultivo(e.target.value)} required>
                  <option value="Hidroponia">Hidroponia</option>
                  <option value="Solo">Solo</option>
                  <option value="Vasos">Vasos</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label">Área (m²)</label>
              <div className="input-group">
                <span className="input-group-text"><FiSquare /></span>
                <input type="number" min="0" className="form-control" value={area} onChange={(e) => setArea(e.target.value)} placeholder="Área em metros" required />
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Objetivo do Uso</label>
              <select className="form-select" value={objetivoUso} onChange={(e) => setObjetivoUso(e.target.value)} required>
                <option value="">Selecione</option>
                <option value="Controle de Pragas">Controle de Pragas</option>
                <option value="Prevenção">Prevenção</option>
                <option value="Pesquisa">Pesquisa</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label">Data da Aplicação</label>
              <div className="input-group">
                <span className="input-group-text"><FiCalendar /></span>
                <input type="date" className="form-control" value={dataAplicacao} onChange={(e) => setDataAplicacao(e.target.value)} required />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-end">
              <div className="w-100">
                <label className="form-label">Estimativa de Ácaros</label>
                <div className="badge bg-primary fs-6 w-100 py-2">
                  {area && !isNaN(area) ? `${acaros} ácaros (15/m²)` : "Informe a área"}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label">Mensagem</label>
            <div className="input-group">
              <span className="input-group-text align-items-start pt-2"><FiMessageCircle /></span>
              <textarea className="form-control" rows="4" placeholder="Deixe sua mensagem" required />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold fs-5 py-2">
            Enviar Solicitação
          </button>
        </form>
      </div>
    </div>
  );
}
