import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import salas from "../data/salas.json";
import {
  FaTemperatureHigh,
  FaTint,
  FaWind,
  FaCompressArrowsAlt,
  FaSun,
  FaCloud,
  FaWater,
  FaSeedling,
  FaBolt,
  FaLeaf,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaUser,
  FaWifi,
  FaBatteryHalf,
  FaMicrochip,
  FaToolbox,
  FaClock,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { ref as dbRef, get, set, update } from "firebase/database";

function SalaDetalhe() {
  const { id } = useParams();
  const { usuario } = useAuth();

  const sala = salas.find((s) => s.id === parseInt(id));

  const [salva, setSalva] = useState(false);
  const [loading, setLoading] = useState(false);

  const [descricaoEdit, setDescricaoEdit] = useState(sala.descricao || "");
  const [responsavelEdit, setResponsavelEdit] = useState(
    sala.responsavel || ""
  );
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    if (!usuario || !sala) return;

    const salaRef = dbRef(db, `users/${usuario.uid}/salasSalvas/${sala.id}`);
    get(salaRef).then((snapshot) => {
      if (snapshot.exists()) {
        setSalva(true);
      }
    });
  }, [usuario, sala]);

  if (!sala) return <div className="container mt-4">Sala não encontrada</div>;

  const alertaTemp =
    sala.temperatura < 18 || sala.temperatura > 30
      ? " - Verificar temperatura!"
      : "";
  const alertaUmid =
    sala.umidade < 40 || sala.umidade > 80 ? " - Verificar umidade!" : "";
  const alertaAmonia = sala.amonia > 0.03 ? " - Níveis de amônia altos!" : "";
  const alertaPressao =
    sala.pressao < 980 || sala.pressao > 1050 ? " - Pressão fora do ideal" : "";
  const alertaCO2 =
    sala.co2 < 350 || sala.co2 > 1000 ? " - CO2 fora do ideal" : "";
  const alertaLuminosidade =
    sala.luminosidade < 300 || sala.luminosidade > 1000
      ? " - Verificar luminosidade"
      : "";
  const alertaNivelSolo =
    sala.nivelSolo < 30 || sala.nivelSolo > 70
      ? " - Nível do solo fora do ideal"
      : "";
  const alertaPH =
    sala.phSolo < 5.5 || sala.phSolo > 7.5 ? " - pH do solo fora do ideal" : "";
  const alertaPrecipitacao =
    sala.precipitacao > 0 ? " - Atenção: precipitação" : "";
  const alertaVento = sala.vento > 10 ? " - Vento forte detectado" : "";
  const alertaFertilizante =
    sala.nivelFertilizante < 20 ? " - Fertilizante baixo" : "";

  const handleSalvarSala = async () => {
    if (!usuario) {
      alert("Você precisa estar logado para salvar salas.");
      return;
    }

    setLoading(true);

    try {
      const salaAtualizada = {
        ...sala,
        descricao: descricaoEdit,
        responsavel: responsavelEdit,
      };

      const salaRef = dbRef(db, `users/${usuario.uid}/salasSalvas/${sala.id}`);
      await set(salaRef, salaAtualizada);
      setSalva(true);
      setEditando(false);
      alert("Sala salva com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar sala:", error);
      alert("Erro ao salvar sala: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Detalhes da {sala.nome}</h2>
      {sala.imagemURL && (
        <img
          src={sala.imagemURL}
          alt={`Imagem da ${sala.nome}`}
          className="img-fluid rounded mb-3"
          style={{ maxHeight: "300px", objectFit: "cover", width: "100%" }}
        />
      )}

      <ul className="list-group">
        <li className="list-group-item">
          <FaTemperatureHigh /> Temperatura: {sala.temperatura}°C{" "}
          {alertaTemp && <span className="text-danger">{alertaTemp}</span>}
        </li>
        <li className="list-group-item">
          <FaTint /> Umidade: {sala.umidade}%{" "}
          {alertaUmid && <span className="text-warning">{alertaUmid}</span>}
        </li>
        <li className="list-group-item">
          <FaWind /> Amônia: {sala.amonia} ppm{" "}
          {alertaAmonia && <span className="text-danger">{alertaAmonia}</span>}
        </li>
        <li className="list-group-item">
          <FaCompressArrowsAlt /> Pressão: {sala.pressao} hPa{" "}
          {alertaPressao && (
            <span className="text-warning">{alertaPressao}</span>
          )}
        </li>
        <li className="list-group-item">
          <FaSun /> Luminosidade: {sala.luminosidade} lux{" "}
          {alertaLuminosidade && (
            <span className="text-warning">{alertaLuminosidade}</span>
          )}
        </li>
        <li className="list-group-item">
          <FaLeaf /> CO2: {sala.co2} ppm{" "}
          {alertaCO2 && <span className="text-warning">{alertaCO2}</span>}
        </li>
        <li className="list-group-item">
          <FaWater /> Nível do Solo: {sala.nivelSolo}%{" "}
          {alertaNivelSolo && (
            <span className="text-warning">{alertaNivelSolo}</span>
          )}
        </li>
        <li className="list-group-item">
          <FaSeedling /> pH do Solo: {sala.phSolo}{" "}
          {alertaPH && <span className="text-warning">{alertaPH}</span>}
        </li>
        <li className="list-group-item">
          <FaCloud /> Precipitação: {sala.precipitacao} mm{" "}
          {alertaPrecipitacao && (
            <span className="text-info">{alertaPrecipitacao}</span>
          )}
        </li>
        <li className="list-group-item">
          <FaWind /> Vento: {sala.vento} m/s{" "}
          {alertaVento && <span className="text-warning">{alertaVento}</span>}
        </li>
        <li className="list-group-item">
          <FaBolt /> Consumo de Energia: {sala.consumoEnergia} kWh
        </li>
        <li className="list-group-item">
          <FaLeaf /> Nível de Fertilizante: {sala.nivelFertilizante}%{" "}
          {alertaFertilizante && (
            <span className="text-warning">{alertaFertilizante}</span>
          )}
        </li>
        <li className="list-group-item">
          <FaCalendarAlt /> Última atualização:{" "}
          {new Date(sala.dataAtualizacao).toLocaleString()}
        </li>
        <li className="list-group-item">
          <strong>Descrição:</strong>{" "}
          {editando ? (
            <input
              type="text"
              className="form-control mt-1"
              value={descricaoEdit}
              onChange={(e) => setDescricaoEdit(e.target.value)}
            />
          ) : (
            <span>{sala.descricao || "Sem descrição"}</span>
          )}
        </li>

        <li className="list-group-item">
          <FaUser /> Responsável:{" "}
          {editando ? (
            <input
              type="text"
              className="form-control mt-1"
              value={responsavelEdit}
              onChange={(e) => setResponsavelEdit(e.target.value)}
            />
          ) : (
            <span>{sala.responsavel || "N/A"}</span>
          )}
        </li>

        <li className="list-group-item">
          <FaWifi /> Status Wi-Fi: {sala.wifiStatus || "Desconhecido"}
        </li>
        <li className="list-group-item">
          <FaBatteryHalf /> Bateria:{" "}
          {sala.bateria != null ? sala.bateria + "%" : "N/A"}
        </li>
        <li className="list-group-item">
          <FaMicrochip /> Sensor ID: {sala.sensorID || "N/A"}
        </li>
        <li className="list-group-item">
          <FaToolbox /> Firmware: {sala.firmwareVersao || "N/A"}
        </li>
        <li className="list-group-item">
          <FaClock /> Uptime:{" "}
          {sala.uptimeSistema != null ? sala.uptimeSistema + "h" : "N/A"}
        </li>
        <li className="list-group-item">
          <strong>Modo de Operação:</strong> {sala.modoOperacao || "N/A"}
        </li>

        {sala.status && (
          <li className="list-group-item">
            <strong>Status:</strong>{" "}
            {sala.status === "OK" ? (
              <span className="text-success">{sala.status}</span>
            ) : (
              <span className="text-danger">{sala.status}</span>
            )}
          </li>
        )}
        {sala.alertas && sala.alertas.length > 0 && (
          <li className="list-group-item text-danger">
            <FaExclamationTriangle /> Alertas: {sala.alertas.join(", ")}
          </li>
        )}
      </ul>

      {!salva && usuario && (
        <button
          onClick={handleSalvarSala}
          disabled={loading}
          className="btn btn-primary mt-3"
        >
          {loading ? "Salvando..." : "Salvar sala"}
        </button>
      )}

      {usuario && (
        <button
          onClick={() => setEditando(!editando)}
          className={`btn ${
            editando ? "btn-success" : "btn-outline-secondary"
          } mt-3 me-2`}
        >
          {editando ? "Cancelar Edição" : "Editar Campos"}
        </button>
      )}

      {editando && (
        <button
          onClick={handleSalvarSala}
          disabled={loading}
          className="btn btn-primary mt-3 me-2"
        >
          {loading ? "Salvando..." : "Salvar alterações"}
        </button>
      )}

      <Link to="/" className="btn btn-secondary mt-3 ms-2">
        Voltar
      </Link>
    </div>
  );
}

export default SalaDetalhe;
