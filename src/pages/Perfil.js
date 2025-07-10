import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Form, Button, Image, Row, Col, Card } from "react-bootstrap";

import { ref as dbRef, get, set } from "firebase/database";
import { db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

const AVATAR_OPTIONS = [
  "https://i.pravatar.cc/100?img=1",
  "https://i.pravatar.cc/100?img=2",
  "https://i.pravatar.cc/100?img=3",
  "https://i.pravatar.cc/100?img=4",
  "https://i.pravatar.cc/100?img=5",
];

function Perfil() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const [perfil, setPerfil] = useState({
    nome: "",
    sobrenome: "",
    apelido: "",
    celular: "",
    fotoURL: AVATAR_OPTIONS[0],
  });

  const [salasSalvas, setSalasSalvas] = useState([]);
  const [loadingPerfil, setLoadingPerfil] = useState(false);
  const [loadingSalas, setLoadingSalas] = useState(false);
  const [savingPerfil, setSavingPerfil] = useState(false);

  useEffect(() => {
    if (!usuario) return;

    setLoadingPerfil(true);
    const perfilRef = dbRef(db, "users/" + usuario.uid + "/perfil");
    get(perfilRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setPerfil(snapshot.val());
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar perfil:", error);
      })
      .finally(() => setLoadingPerfil(false));
  }, [usuario]);

  useEffect(() => {
    if (!usuario) return;

    setLoadingSalas(true);
    const salasRef = dbRef(db, "users/" + usuario.uid + "/salasSalvas");
    get(salasRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          // Transformar objeto em array
          const lista = Object.values(data);
          setSalasSalvas(lista);
        } else {
          setSalasSalvas([]);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar salas salvas:", error);
      })
      .finally(() => setLoadingSalas(false));
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfil((prev) => ({ ...prev, [name]: value }));
  };

  const escolherAvatar = (url) => {
    setPerfil((prev) => ({ ...prev, fotoURL: url }));
  };

  const handleSalvar = async () => {
    if (!usuario) {
      alert("Usuário não autenticado");
      return;
    }

    setSavingPerfil(true);

    try {
      const perfilRef = dbRef(db, "users/" + usuario.uid + "/perfil");
      await set(perfilRef, perfil);
      alert("Perfil salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      alert("Erro ao salvar perfil: " + error.message);
    } finally {
      setSavingPerfil(false);
    }
  };

  return (
    <div className="container mt-5">
      <Button
        variant="secondary"
        className="mb-3"
        onClick={() => navigate("/")}
      >
        ← Voltar para Home
      </Button>
      <h3>Perfil do Usuário</h3>

      <div className="mb-4 text-center">
        <Image
          src={perfil.fotoURL}
          roundedCircle
          width={120}
          height={120}
          alt="Avatar selecionado"
        />
      </div>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Escolha um avatar</Form.Label>
          <Row>
            {AVATAR_OPTIONS.map((url) => (
              <Col xs={2} key={url} className="mb-3">
                <Image
                  src={url}
                  roundedCircle
                  width={60}
                  height={60}
                  style={{
                    cursor: "pointer",
                    border:
                      perfil.fotoURL === url
                        ? "3px solid #007bff"
                        : "2px solid transparent",
                  }}
                  onClick={() => escolherAvatar(url)}
                  alt="avatar opção"
                />
              </Col>
            ))}
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" readOnly value={usuario?.email || ""} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="nome">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            name="nome"
            value={perfil.nome}
            onChange={handleChange}
            placeholder="Digite seu nome"
            disabled={loadingPerfil}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="sobrenome">
          <Form.Label>Sobrenome</Form.Label>
          <Form.Control
            type="text"
            name="sobrenome"
            value={perfil.sobrenome}
            onChange={handleChange}
            placeholder="Digite seu sobrenome"
            disabled={loadingPerfil}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="apelido">
          <Form.Label>Apelido</Form.Label>
          <Form.Control
            type="text"
            name="apelido"
            value={perfil.apelido}
            onChange={handleChange}
            placeholder="Digite seu apelido"
            disabled={loadingPerfil}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="celular">
          <Form.Label>Celular</Form.Label>
          <Form.Control
            type="tel"
            name="celular"
            value={perfil.celular}
            onChange={handleChange}
            placeholder="Digite seu telefone"
            disabled={loadingPerfil}
          />
        </Form.Group>

        <Button
          variant="primary"
          onClick={handleSalvar}
          disabled={savingPerfil}
          className="mb-4"
        >
          {savingPerfil ? "Salvando..." : "Salvar Perfil"}
        </Button>
      </Form>

      <h4>Salas Salvas</h4>
      {loadingSalas ? (
        <p>Carregando salas salvas...</p>
      ) : salasSalvas.length === 0 ? (
        <p>Nenhuma sala salva ainda.</p>
      ) : (
        <Row>
          {salasSalvas.map((sala) => (
            <Col key={sala.id} md={4} className="mb-3">
              <Card>
                {sala.imagemURL && (
                  <Card.Img
                    variant="top"
                    src={sala.imagemURL}
                    alt={`Imagem da ${sala.nome}`}
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                )}
                <Card.Body>
                  <Card.Title>{sala.nome}</Card.Title>
                  <Card.Text>
                    Temperatura: {sala.temperatura}°C <br />
                    Umidade: {sala.umidade}%
                  </Card.Text>
                  <Link
                    to={`/sala/${sala.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    Ver detalhes
                  </Link>
                  <Link
                    to={`/dashboard/${sala.id}`}
                    className="btn btn-success btn-sm"
                  >
                    Gerar Dashboard
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default Perfil;
