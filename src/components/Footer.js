import React from "react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer
      className="text-white py-5"
      style={{
        background: "linear-gradient(to right, #2c3e50, #34495e)",
        boxShadow: "0px -8px 30px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="container text-center">
        <h5 className="fw-bold mb-2" style={{ fontSize: "1.8rem", letterSpacing: "1px", fontFamily: "'Poppins', sans-serif" }}>
          Greative
        </h5>

        <p
          className="mb-4"
          style={{
            maxWidth: "500px",
            margin: "0 auto",
            fontSize: "1rem",
            fontFamily: "'Roboto', sans-serif",
            lineHeight: "1.5",
          }}
        >
          Transformando o futuro com inovação, tecnologia e soluções inteligentes. Vamos criar algo incrível juntos.
        </p>

        <div className="mb-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-3 icon-hover"
            style={{
              transition: "all 0.3s ease-in-out",
            }}
          >
            <FaInstagram size={26} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-3 icon-hover"
            style={{
              transition: "all 0.3s ease-in-out",
            }}
          >
            <FaLinkedin size={26} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-3 icon-hover"
            style={{
              transition: "all 0.3s ease-in-out",
            }}
          >
            <FaGithub size={26} />
          </a>
        </div>

        <small className="text-secondary" style={{ fontFamily: "'Roboto', sans-serif" }}>
          © {new Date().getFullYear()} <strong>Greative</strong>. Todos os direitos reservados.
        </small>
      </div>

      <style>{`
        .icon-hover {
          transition: transform 0.3s ease, color 0.3s ease, opacity 0.3s ease;
        }
        .icon-hover:hover {
          transform: scale(1.3);
          color: #f39c12;
          opacity: 0.8;
        }
        .icon-hover:focus {
          outline: none;
          transform: scale(1.2);
        }
      `}</style>
    </footer>
  );
}

export default Footer;
