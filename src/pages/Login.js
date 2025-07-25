import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
        <div
          className="login-box shadow p-5 rounded-4 bg-white"
          style={{
            maxWidth: 420,
            width: "100%",
            border: "1px solid #dee2e6",
            background: "#fdfdfd",
          }}
        >
          <h2 className="text-center mb-4 fw-bold" style={{ color: "#343a40" }}>
            Entrar no <span style={{ color: "#007bff" }}>Greative</span>
          </h2>

          <form onSubmit={handleLogin}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="inputEmail">Email</label>
            </div>

            <div className="form-floating mb-3 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="inputPassword"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <label htmlFor="inputPassword">Senha</label>
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: 15,
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#6c757d",
                  fontSize: "1.2rem",
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button
              className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 py-2"
              type="submit"
            >
              <FiLogIn size={20} />
              Entrar
            </button>
          </form>

          <div className="text-center mt-4" style={{ fontSize: "0.95rem" }}>
            <p className="mb-1">
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
