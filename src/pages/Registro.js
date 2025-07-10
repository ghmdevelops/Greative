import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
import "./Login.css";

function Registro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, senha);
      await set(ref(db, "users/" + userCred.user.uid), {
        email: email,
        createdAt: new Date().toISOString(),
      });
      navigate("/");
    } catch (error) {
      alert("Erro ao registrar: " + error.message);
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
          <h2 className="login-title">Criar uma Conta</h2>
          <form onSubmit={handleRegistro}>
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
              className="btn btn-success d-flex align-items-center justify-content-center gap-2"
              type="submit"
            >
              <FiUserPlus size={20} />
              Registrar
            </button>
          </form>

          <p className="text-center mt-3">
            Já tem uma conta?{" "}
            <Link to="/login" className="link-login">
              Faça login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Registro;
