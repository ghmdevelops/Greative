import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiLogIn, FiUserPlus } from "react-icons/fi";

import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiActivity,
  FiSquare,
  FiPackage,
  FiMessageCircle,
  FiLayers,
  FiGrid,
  FiCalendar,
} from "react-icons/fi";

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
  const [dataAplicacao, setDataAplicacao] = useState("");

  const handleEnviar = (e) => {
    e.preventDefault();
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
        } else {
          alert("CEP não encontrado");
          setLocal("");
          setBairro("");
          setEstado("");
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
      className="landing-page min-vh-100 d-flex flex-column"
      style={{
        background: "linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%)",
        color: "#000",
        position: "relative",
      }}
    >
      <header className="bg-transparent py-4 shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          <Link to="/welcome" style={{ textDecoration: "none" }}>
            <h3 className="greative-title" style={{ cursor: "pointer" }}>
              Greative
            </h3>
          </Link>
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

      <div
        className="landing-page min-vh-100 d-flex flex-column justify-content-center align-items-center"
        style={{
          background: "linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%)",
          padding: "2rem",
        }}
      >
        <form
          onSubmit={handleEnviar}
          className="bg-white rounded shadow p-4"
          style={{ maxWidth: 900, width: "100%" }}
        >
          <h2 className="text-primary fw-bold mb-4 text-center">
            Solicitar Orçamento
          </h2>

          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <label htmlFor="nome" className="form-label">
                Nome
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <FiUser />
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  placeholder="Nome"
                  required
                />
              </div>
            </div>

            <div className="col-md-4">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <FiMail />
                </span>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  required
                />
              </div>
            </div>

            <div className="col-md-4">
              <label htmlFor="telefone" className="form-label">
                Telefone
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <FiPhone />
                </span>
                <input
                  type="tel"
                  className="form-control"
                  id="telefone"
                  placeholder="Telefone"
                  required
                />
              </div>
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <label htmlFor="cep" className="form-label">
                CEP
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <FiMapPin />
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="cep"
                  placeholder="CEP"
                  value={cep}
                  maxLength={9}
                  onChange={(e) => setCep(e.target.value)}
                  onBlur={handleCepBlur}
                  required
                />
              </div>
            </div>

            <div className="col-md-4">
              <label htmlFor="bairro" className="form-label">
                Bairro
              </label>
              <input
                type="text"
                className="form-control"
                id="bairro"
                value={bairro}
                readOnly
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="estado" className="form-label">
                Estado
              </label>
              <input
                type="text"
                className="form-control"
                id="estado"
                value={estado}
                readOnly
              />
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label htmlFor="local" className="form-label">
                Local (cidade)
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <FiMapPin />
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="local"
                  placeholder="Local (cidade)"
                  value={local}
                  onChange={(e) => setLocal(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <label htmlFor="cultivo" className="form-label">
                Cultivo (ex: morango, alface)
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <FiActivity />
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="cultivo"
                  placeholder="Nome da cultura"
                  value={cultivo}
                  onChange={(e) => setCultivo(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label htmlFor="abertoFechado" className="form-label">
                Aberto ou Fechado
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <FiLayers />
                </span>
                <select
                  className="form-select"
                  id="abertoFechado"
                  value={tipoAbertoFechado}
                  onChange={(e) => setTipoAbertoFechado(e.target.value)}
                  required
                >
                  <option value="Aberto">Aberto</option>
                  <option value="Fechado">Fechado</option>
                </select>
              </div>
            </div>

            <div className="col-md-6">
              <label htmlFor="tipoCultivo" className="form-label">
                Hidroponia, Solo ou Vasos
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <FiGrid />
                </span>
                <select
                  className="form-select"
                  id="tipoCultivo"
                  value={tipoCultivo}
                  onChange={(e) => setTipoCultivo(e.target.value)}
                  required
                >
                  <option value="Hidroponia">Hidroponia</option>
                  <option value="Solo">Solo</option>
                  <option value="Vasos">Vasos</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <label htmlFor="area" className="form-label">
                Área de Produção (m²)
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <FiSquare />
                </span>
                <input
                  type="number"
                  className="form-control"
                  id="area"
                  placeholder="Área"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="col-md-4">
              <label htmlFor="quantidade" className="form-label">
                Quantidade
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <FiPackage />
                </span>
                <input
                  type="number"
                  className="form-control"
                  id="quantidade"
                  placeholder="Quantidade"
                  required
                />
              </div>
            </div>

            <div className="col-md-4">
              <label htmlFor="volume" className="form-label">
                Volume (ex: litros, kg)
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <FiPackage />
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="volume"
                  placeholder="Volume"
                  required
                />
              </div>
            </div>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label htmlFor="tipoAcaro" className="form-label">
                Tipo de Ácaro Predador
              </label>
              <select
                className="form-select"
                id="tipoAcaro"
                value={tipoAcaro}
                onChange={(e) => setTipoAcaro(e.target.value)}
                required
              >
                <option value="">Selecione</option>
                <option value="Phytoseiulus">Phytoseiulus</option>
                <option value="Amblyseius">Amblyseius</option>
                <option value="Neoseiulus">Neoseiulus</option>
                <option value="Outros">Outros</option>
              </select>
            </div>

            <div className="col-md-6">
              <label htmlFor="quantidadeAcaros" className="form-label">
                Quantidade de Ácaros Desejada
              </label>
              <input
                type="number"
                className="form-control"
                id="quantidadeAcaros"
                placeholder="Quantidade desejada"
                min="0"
                value={quantidadeAcaros}
                onChange={(e) => setQuantidadeAcaros(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label htmlFor="objetivoUso" className="form-label">
                Objetivo do Uso
              </label>
              <select
                className="form-select"
                id="objetivoUso"
                value={objetivoUso}
                onChange={(e) => setObjetivoUso(e.target.value)}
                required
              >
                <option value="">Selecione</option>
                <option value="Controle de Pragas">Controle de Pragas</option>
                <option value="Prevenção">Prevenção</option>
                <option value="Pesquisa">Pesquisa</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            <div className="col-md-6">
              <label htmlFor="dataAplicacao" className="form-label">
                Data Prevista para Aplicação
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <FiCalendar />
                </span>
                <input
                  type="date"
                  className="form-control"
                  id="dataAplicacao"
                  value={dataAplicacao}
                  onChange={(e) => setDataAplicacao(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-4 text-center">
            <span
              className="badge bg-primary d-inline-block fs-6 fs-md-5 px-3 px-md-4 py-2"
              style={{ minWidth: "200px" }}
            >
              {area && !isNaN(area)
                ? `${acaros} ácaros (15 ácaros por m²)`
                : "Informe a área para calcular."}
            </span>
          </div>

          <div className="mb-4">
            <label htmlFor="mensagem" className="form-label">
              Mensagem
            </label>
            <div className="input-group">
              <span className="input-group-text bg-light align-items-start pt-2">
                <FiMessageCircle />
              </span>
              <textarea
                className="form-control"
                id="mensagem"
                placeholder="Mensagem"
                rows="4"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-bold fs-5 py-2"
          >
            Enviar Solicitação
          </button>
        </form>
      </div>
    </div>
  );
}
