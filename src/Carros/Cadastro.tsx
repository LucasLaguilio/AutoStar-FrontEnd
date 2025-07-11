import React, { useEffect, useState } from "react";
import "./Cadastro.css";

interface CarrosState {
  id: number;
  nome: string;
  marca: string;
  preco: number;
  cor: string;
  categoria: string;
  ano: number;
  descricao: string;
  linkimg: string;
}

function CadastroVeiculos() {
  const [nome, setNome] = useState("");
  const [marca, setMarca] = useState("");
  const [preco, setPreco] = useState("");
  const [cor, setCor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [ano, setAno] = useState("");
  const [descricao, setDescacao] = useState("");
  const [linkimg, setLinkimg] = useState("");
  const [erroMensagem, setErroMensagem] = useState("");
  const [carros, setCarros] = useState<CarrosState[]>([]);
  const [editingCarId, setEditingCarId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<CarrosState>>({});

  const fetchCarros = async () => {
    try {
      const resposta = await fetch("http://localhost:8000/Carros");
      if (resposta.status === 200) {
        const result = await resposta.json();
        setCarros(result);
        setErroMensagem("");
      } else if (resposta.status === 400) {
        const result = await resposta.json();
        setErroMensagem(result.mensagem);
      }
    } catch (erro: any) {
      setErroMensagem(
        "Erro ao Realizar o fetch no backend. Verifique se o backend está rodando e a conexão.",
      );
      console.error("Erro no fetch:", erro);
    }
  };

  useEffect(() => {
    fetchCarros();
  }, []);

  async function trataForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const CadastrarCarro = {
      nome,
      marca,
      preco: parseFloat(preco),
      cor,
      categoria,
      ano: parseInt(ano),
      descricao,
      linkimg,
    };

    try {
      const resposta = await fetch("http://localhost:8000/Carros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(CadastrarCarro),
      });
      if (resposta.status === 200) {
        await fetchCarros();
        setNome("");
        setMarca("");
        setPreco("");
        setCor("");
        setCategoria("");
        setAno("");
        setDescacao("");
        setLinkimg("");
        setErroMensagem("");
      } else if (resposta.status === 400) {
        const result = await resposta.json();
        setErroMensagem(result.mensagem);
      }
    } catch (erro: any) {
      setErroMensagem("Erro ao Realizar o fetch no backend");
      console.error("Erro no POST:", erro);
    }
  }

  const handleEditClick = (carro: CarrosState) => {
    setEditingCarId(carro.id);
    setEditFormData(carro);
  };

  const handleEditFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: name === "preco" || name === "ano" ? parseFloat(value) : value,
    }));
  };

  const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editingCarId === null) return;

    try {
      const resposta = await fetch(
        `http://localhost:8000/Carros/${editingCarId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editFormData),
        },
      );

      if (resposta.status === 200) {
        setCarros(
          carros.map((carro) =>
            carro.id === editingCarId ? { ...carro, ...editFormData } : carro,
          ),
        );
        setEditingCarId(null);
        setErroMensagem("");
      } else if (resposta.status === 400) {
        const result = await resposta.json();
        setErroMensagem(result.mensagem);
      } else if (resposta.status === 404) {
        const result = await resposta.json();
        setErroMensagem(result.mensagem); // "Carro não encontrado para atualização."
      } else {
        setErroMensagem("Erro desconhecido ao atualizar o carro.");
      }
    } catch (erro: any) {
      setErroMensagem("Erro ao atualizar o carro no backend (Network Error)");
      console.error("Erro no PUT:", erro);
    }
  };

  const handleDeleteClick = async (idToDelete: number) => {
    try {
      const resposta = await fetch(
        `http://localhost:8000/Carros/${idToDelete}`,
        {
          method: "DELETE",
        },
      );

      if (resposta.status === 200) {
        setCarros(carros.filter((carro) => carro.id !== idToDelete));
        setErroMensagem("");
      } else if (resposta.status === 400) {
        const result = await resposta.json();
        setErroMensagem(result.mensagem);
      } else if (resposta.status === 404) {
        const result = await resposta.json();
        setErroMensagem(result.mensagem); // "Carro não encontrado para exclusão."
      } else {
        setErroMensagem("Erro desconhecido ao excluir o carro.");
      }
    } catch (erro: any) {
      setErroMensagem("Erro ao excluir o carro no backend (Network Error)");
      console.error("Erro no DELETE:", erro);
    }
  };

  function trataNome(event: React.ChangeEvent<HTMLInputElement>) {
    setNome(event.target.value);
  }
  function trataMarca(event: React.ChangeEvent<HTMLInputElement>) {
    setMarca(event.target.value);
  }
  function trataPreco(event: React.ChangeEvent<HTMLInputElement>) {
    setPreco(event.target.value);
  }
  function trataCor(event: React.ChangeEvent<HTMLInputElement>) {
    setCor(event.target.value);
  }
  function trataCategoria(event: React.ChangeEvent<HTMLInputElement>) {
    setCategoria(event.target.value);
  }
  function trataAno(event: React.ChangeEvent<HTMLInputElement>) {
    setAno(event.target.value);
  }
  function trataDescricao(event: React.ChangeEvent<HTMLInputElement>) {
    setDescacao(event.target.value);
  }
  function trataImg(event: React.ChangeEvent<HTMLInputElement>) {
    setLinkimg(event.target.value);
  }

  return (
    <>
      {erroMensagem && (
        <div className="mensagem-erro">
          <p>{erroMensagem}</p>
        </div>
      )}

      <div className="container">
        <div className="container-cadastro">
          <h1>Cadastrar Carro</h1>
          <form onSubmit={trataForm}>
            <input
              type="text"
              name="nome"
              id="nome"
              placeholder="Nome"
              onChange={trataNome}
              value={nome}
            />
            <input
              type="text"
              name="marca"
              id="marca"
              placeholder="Marca"
              onChange={trataMarca}
              value={marca}
            />
            <input
              type="number"
              name="preco"
              id="preco"
              placeholder="Preço"
              onChange={trataPreco}
              value={preco}
            />
            <input
              type="text"
              name="cor"
              id="cor"
              placeholder="Cor"
              onChange={trataCor}
              value={cor}
            />
            <input
              type="text"
              name="categoria"
              id="categoria"
              placeholder="Categoria"
              onChange={trataCategoria}
              value={categoria}
            />
            <input
              type="number"
              name="ano"
              id="ano"
              placeholder="Ano"
              onChange={trataAno}
              value={ano}
            />
            <input
              type="text"
              name="descricao"
              id="descricao"
              placeholder="Descrição"
              onChange={trataDescricao}
              value={descricao}
            />
            <input
              type="url"
              name="linkimg"
              id="linkimg"
              placeholder="Link da Imagem"
              onChange={trataImg}
              value={linkimg}
            />
            <input type="submit" value="Cadastrar" />
          </form>
        </div>
        <div className="container-listagem">
          {carros.map((carro) => (
            <div key={carro.id} className="container-Carros">
              {editingCarId === carro.id ? (
                <form onSubmit={handleEditSubmit}>
                  <input
                    type="text"
                    name="nome"
                    value={editFormData.nome || ""}
                    onChange={handleEditFormChange}
                    placeholder="Nome"
                  />
                  <input
                    type="text"
                    name="marca"
                    value={editFormData.marca || ""}
                    onChange={handleEditFormChange}
                    placeholder="Marca"
                  />
                  <input
                    type="number"
                    name="preco"
                    value={editFormData.preco || ""}
                    onChange={handleEditFormChange}
                    placeholder="Preço"
                  />
                  <input
                    type="text"
                    name="cor"
                    value={editFormData.cor || ""}
                    onChange={handleEditFormChange}
                    placeholder="Cor"
                  />
                  <input
                    type="text"
                    name="categoria"
                    value={editFormData.categoria || ""}
                    onChange={handleEditFormChange}
                    placeholder="Categoria"
                  />
                  <input
                    type="number"
                    name="ano"
                    value={editFormData.ano || ""}
                    onChange={handleEditFormChange}
                    placeholder="Ano"
                  />
                  <input
                    type="text"
                    name="descricao"
                    value={editFormData.descricao || ""}
                    onChange={handleEditFormChange}
                    placeholder="Descrição"
                  />
                  <input
                    type="url"
                    name="linkimg"
                    value={editFormData.linkimg || ""}
                    onChange={handleEditFormChange}
                    placeholder="Link da Imagem"
                  />
                  <button type="submit">Salvar</button>
                  <button type="button" onClick={() => setEditingCarId(null)}>
                    Cancelar
                  </button>
                </form>
              ) : (
                <>
                  <img src={carro.linkimg} alt={carro.nome}></img>
                  <div className="Carros-id">ID: {carro.id}</div>
                  <div className="Carros-nome">Nome: {carro.nome}</div>
                  <div className="Carros-marca">Marca: {carro.marca}</div>
                  <div className="Carros-preco">Preço: {carro.preco} R$</div>
                  <div className="Carros-cor">Cor: {carro.cor}</div>
                  <div className="Carros-categoria">
                    Categoria: {carro.categoria}
                  </div>
                  <div className="Carros-ano">Ano: {carro.ano}</div>
                  <div className="Carros-descricao">
                    Descrição: {carro.descricao}
                  </div>
                  <div className="Carros-linkimg">
                    Link da Imagem: <p> {carro.linkimg} </p>
                  </div>
                  <button onClick={() => handleEditClick(carro)}>Editar</button>
                  <button onClick={() => handleDeleteClick(carro.id)}>
                    Excluir
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CadastroVeiculos;
