import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import "./Login.css";

function RecuperarSenha() {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleRecuperar = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMensagem(
        "Email de recuperação enviado! Verifique sua caixa de entrada."
      );
    } catch (error) {
      setMensagem("Erro: " + error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-header-top">
        <Link to="/welcome" style={{ textDecoration: "none" }}>
          <h3 className="greative-title" style={{ cursor: "pointer" }}>
            Greative
          </h3>
        </Link>
      </div>

      <main className="login-main d-flex justify-content-center align-items-center flex-grow-1">
        <div className="login-box">
          <h2 className="login-title">Recuperar Senha</h2>
          <form onSubmit={handleRecuperar}>
            <input
              className="form-control"
              placeholder="Digite seu email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="btn-primary" type="submit">
              Enviar email de recuperação
            </button>
          </form>

          {mensagem && (
            <div
              className="alert alert-info mt-3"
              style={{ color: "#4e54c8", textAlign: "center" }}
            >
              {mensagem}
            </div>
          )}

          <div className="login-links mt-3">
            <Link to="/login" className="link-secondary">
              Voltar para login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RecuperarSenha;
