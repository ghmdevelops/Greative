import React, { useRef } from "react";
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
} from "react-icons/fa";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const { id } = useParams();
  const sala = salas.find((s) => s.id === parseInt(id));
  const dashboardRef = useRef();

  if (!sala) return <div className="container mt-4">Sala não encontrada</div>;

  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  const tempData = {
    labels,
    datasets: [
      {
        label: "Temperatura (°C)",
        data: [22, 21, 23, 24, 25, sala.temperatura],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const umidData = {
    labels,
    datasets: [
      {
        label: "Umidade (%)",
        data: [60, 62, 61, 63, 64, sala.umidade],
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const gerarPDF = () => {
    const input = dashboardRef.current;
    if (!input) return;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`dashboard_${sala.nome.replace(/\s/g, "_")}.pdf`);
    });
  };

  const gerarPDFTexto = () => {
    const pdf = new jsPDF();
    let y = 10;
    const now = new Date();
    const dataHora = now.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    pdf.setFontSize(16);
    pdf.text(`Dados da sala: ${sala.nome}`, 10, y);
    y += 10;
    pdf.setFontSize(10);
    pdf.text(`Data e hora: ${dataHora}`, 10, y);
    y += 10;

    pdf.setFontSize(12);
    pdf.text(`Temperatura: ${sala.temperatura} °C`, 10, y);
    y += 8;
    pdf.text(`Umidade: ${sala.umidade} %`, 10, y);
    y += 8;
    pdf.text(`Amônia: ${sala.amonia} ppm`, 10, y);
    y += 8;
    pdf.text(`Pressão: ${sala.pressao} hPa`, 10, y);
    y += 8;
    pdf.text(`Luminosidade: ${sala.luminosidade} lux`, 10, y);
    y += 8;
    pdf.text(`CO2: ${sala.co2} ppm`, 10, y);
    y += 8;
    pdf.text(`Nível do Solo: ${sala.nivelSolo} %`, 10, y);
    y += 8;
    pdf.text(`pH do Solo: ${sala.phSolo}`, 10, y);
    y += 8;
    pdf.text(`Precipitação: ${sala.precipitacao} mm`, 10, y);
    y += 8;
    pdf.text(`Vento: ${sala.vento} m/s`, 10, y);
    y += 8;
    pdf.text(`Consumo de Energia: ${sala.consumoEnergia} kWh`, 10, y);
    y += 8;
    pdf.text(`Nível de Fertilizante: ${sala.nivelFertilizante} %`, 10, y);
    y += 10;
    pdf.text("Descrição:", 10, y);
    y += 8;

    const splitDesc = pdf.splitTextToSize(sala.descricao, 180);
    pdf.text(splitDesc, 10, y);

    pdf.save(`dados_sala_${sala.nome.replace(/\s/g, "_")}.pdf`);
  };

  return (
    <div className="container mt-4" ref={dashboardRef}>
      <h2>Dashboard da {sala.nome}</h2>

      {sala.imagemURL && (
        <img
          src={sala.imagemURL}
          alt={`Imagem da ${sala.nome}`}
          className="img-fluid rounded mb-4"
          style={{ maxHeight: "300px", objectFit: "cover", width: "100%" }}
        />
      )}

      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-primary h-100">
            <div className="card-body">
              <FaTemperatureHigh size={30} />
              <h5 className="card-title mt-2">Temperatura</h5>
              <p className="card-text fs-4">{sala.temperatura}°C</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card text-white bg-info h-100">
            <div className="card-body">
              <FaTint size={30} />
              <h5 className="card-title mt-2">Umidade</h5>
              <p className="card-text fs-4">{sala.umidade}%</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card text-white bg-warning h-100">
            <div className="card-body">
              <FaWind size={30} />
              <h5 className="card-title mt-2">Amônia</h5>
              <p className="card-text fs-4">{sala.amonia} ppm</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card text-white bg-secondary h-100">
            <div className="card-body">
              <FaCompressArrowsAlt size={30} />
              <h5 className="card-title mt-2">Pressão</h5>
              <p className="card-text fs-4">{sala.pressao} hPa</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card text-white bg-success h-100">
            <div className="card-body">
              <FaSun size={30} />
              <h5 className="card-title mt-2">Luminosidade</h5>
              <p className="card-text fs-4">{sala.luminosidade} lux</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card text-white bg-danger h-100">
            <div className="card-body">
              <FaLeaf size={30} />
              <h5 className="card-title mt-2">CO2</h5>
              <p className="card-text fs-4">{sala.co2} ppm</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card text-white bg-primary h-100">
            <div className="card-body">
              <FaWater size={30} />
              <h5 className="card-title mt-2">Nível do Solo</h5>
              <p className="card-text fs-4">{sala.nivelSolo}%</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card text-white bg-info h-100">
            <div className="card-body">
              <FaSeedling size={30} />
              <h5 className="card-title mt-2">pH do Solo</h5>
              <p className="card-text fs-4">{sala.phSolo}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card text-white bg-warning h-100">
            <div className="card-body">
              <FaCloud size={30} />
              <h5 className="card-title mt-2">Precipitação</h5>
              <p className="card-text fs-4">{sala.precipitacao} mm</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card text-white bg-secondary h-100">
            <div className="card-body">
              <FaWind size={30} />
              <h5 className="card-title mt-2">Vento</h5>
              <p className="card-text fs-4">{sala.vento} m/s</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card text-white bg-success h-100">
            <div className="card-body">
              <FaBolt size={30} />
              <h5 className="card-title mt-2">Consumo de Energia</h5>
              <p className="card-text fs-4">{sala.consumoEnergia} kWh</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card text-white bg-danger h-100">
            <div className="card-body">
              <FaLeaf size={30} />
              <h5 className="card-title mt-2">Nível de Fertilizante</h5>
              <p className="card-text fs-4">{sala.nivelFertilizante}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h4>Gráficos históricos (exemplo)</h4>

        <div style={{ maxWidth: "600px", marginBottom: "40px" }}>
          <Line data={tempData} />
        </div>

        <div style={{ maxWidth: "600px" }}>
          <Line data={umidData} />
        </div>
      </div>

      <div className="mt-4">
        <h5>Descrição:</h5>
        <p>{sala.descricao}</p>
      </div>

      <div className="mt-3 mb-5 d-flex gap-3">
        <button className="btn btn-success" onClick={gerarPDF}>
          📄 Gerar PDF com gráfico e imagem
        </button>
        <button className="btn btn-primary" onClick={gerarPDFTexto}>
          📄 Gerar PDF só com dados
        </button>
        <Link to="/" className="btn btn-secondary">
          Voltar
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
