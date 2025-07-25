import React, { useEffect, useState } from "react";
import salas from "../data/salas.json";
import SalaCard from "../components/SalaCard";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Dropdown, Image } from "react-bootstrap";

import { ref as dbRef, get } from "firebase/database";
import { db } from "../firebase";

function Home() {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const auth = getAuth();
  const [theme, setTheme] = useState("light");
  const [avatarURL, setAvatarURL] = useState(null);
  const [nomeCompleto, setNomeCompleto] = useState("");

  useEffect(() => {
    if (!usuario) return;

    const perfilRef = dbRef(db, `users/${usuario.uid}/perfil/fotoURL`);
    get(perfilRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setAvatarURL(snapshot.val());
        } else {
          setAvatarURL(null);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar avatar:", error);
      });
  }, [usuario]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/welcome");
      })
      .catch((error) => {
        console.error("Erro ao sair:", error);
      });
  };

  useEffect(() => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (theme === "light") {
      html.classList.remove("light");
      html.classList.add("dark");
      setTheme("dark");
    } else {
      html.classList.remove("dark");
      html.classList.add("light");
      setTheme("light");
    }
  };

  useEffect(() => {
    if (!usuario) return;

    const userRef = dbRef(db, `users/${usuario.uid}/perfil`);

    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const dados = snapshot.val();
          setAvatarURL(dados.fotoURL || null);
          const nome = dados.nome || "";
          const sobrenome = dados.sobrenome || "";
          const apelido = dados.apelido || "";
          setNomeCompleto(`${apelido}`.trim());
        } else {
          setAvatarURL(null);
          setNomeCompleto("");
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do usuário:", error);
      });
  }, [usuario]);

  const toggleVariant = theme === "dark" ? "light" : "dark";

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Olá, {nomeCompleto}</h4>

        <Dropdown align="end">
          <Dropdown.Toggle
            variant={toggleVariant}
            id="dropdown-avatar"
            style={{ border: "none", padding: 0, background: "transparent" }}
          >
            {avatarURL ? (
              <Image
                src={avatarURL}
                roundedCircle
                width={40}
                height={40}
                alt="Avatar do usuário"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <div
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#007bff",
                  color: "white",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                {usuario?.email?.[0]?.toUpperCase() || "U"}
              </div>
            )}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => navigate("/perfil")}>
              Perfil
            </Dropdown.Item>

            <Dropdown.Item onClick={toggleTheme}>
              Tema: {theme === "light" ? "Claro" : "Escuro"}
            </Dropdown.Item>

            <Dropdown.Divider />

            <Dropdown.Item onClick={handleLogout}>Sair</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <h2>Monitoramento de Temperaturas</h2>
      {salas.map((sala) => (
        <SalaCard key={sala.id} sala={sala} />
      ))}
    </div>
  );
}

export default Home;
