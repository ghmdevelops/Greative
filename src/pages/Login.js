import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/");
    } catch (error) {
      alert("Erro ao logar: " + error.message);
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
          <h2 className="login-title">Entrar no Greative</h2>
          <form onSubmit={handleLogin}>
            <input
              className="form-control"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="form-control"
              placeholder="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <button
              className="btn btn-primary d-flex align-items-center justify-content-center gap-2"
              type="submit"
            >
              <FiLogIn size={20} />
              Entrar
            </button>
          </form>
          <div className="login-links text-center mt-3">
            <p>
              Não tem conta?{" "}
              <Link to="/registro" className="link-primary fw-semibold">
                Registrar
              </Link>
            </p>
            <p>
              <Link to="/recuperar" className="link-secondary">
                Esqueceu a senha?
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
