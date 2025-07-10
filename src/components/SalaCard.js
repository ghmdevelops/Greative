import React from "react";
import { Link } from "react-router-dom";
import {
  FaTemperatureHigh,
  FaTint,
  FaWind,
  FaCompressArrowsAlt,
} from "react-icons/fa";

function SalaCard({ sala }) {
  const tempClass =
    sala.temperatura < 18 || sala.temperatura > 30 ? "text-danger" : "";
  const umidClass =
    sala.umidade < 40 || sala.umidade > 80 ? "text-warning" : "";
  const amoniaClass = sala.amonia > 0.03 ? "text-danger" : "";
  const pressaoClass =
    sala.pressao < 980 || sala.pressao > 1050 ? "text-warning" : "";

  return (
    <div className="card mb-3 shadow-sm">
      {sala.imagemURL && (
        <img
          src={sala.imagemURL}
          alt={`Imagem da ${sala.nome}`}
          className="card-img-top"
          style={{ objectFit: "cover", height: "200px" }}
        />
      )}

      <div className="card-body">
        <h5 className="card-title">{sala.nome}</h5>
        <div className="d-flex justify-content-around my-3 fs-5">
          <div title="Temperatura" className={tempClass}>
            <FaTemperatureHigh /> {sala.temperatura}°C
          </div>
          <div title="Umidade" className={umidClass}>
            <FaTint /> {sala.umidade}%
          </div>
          <div title="Amônia" className={amoniaClass}>
            <FaWind /> {sala.amonia} ppm
          </div>
          <div title="Pressão" className={pressaoClass}>
            <FaCompressArrowsAlt /> {sala.pressao} hPa
          </div>
        </div>
        <Link to={`/sala/${sala.id}`} className="btn btn-primary w-100">
          Ver detalhes
        </Link>
      </div>
    </div>
  );
}

export default SalaCard;
