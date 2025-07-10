import React from "react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container text-center">
        <h5 className="mb-3 fw-bold">Greative</h5>
        <p className="mb-3">
          Inovação, tecnologia e eficiência para ambientes inteligentes.
        </p>

        <div className="mb-3">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-2"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-2"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-2"
          >
            <FaGithub size={20} />
          </a>
        </div>

        <small>
          © {new Date().getFullYear()} Greative. Todos os direitos reservados.
        </small>
      </div>
    </footer>
  );
}

export default Footer;
