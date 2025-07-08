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
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [marca, setMarca] = useState("");
  const [preco, setPreco] = useState("");
  const [cor, setCor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [ano, setAno] = useState("");
  const [descricao, setDescricao] = useState("");
  const [linkimg, setLinkimg] = useState("");
  const [erroMensagem, setErroMensagem] = useState("");
  const [carros, setCarros] = useState<CarrosState[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resposta = await fetch("http://localhost:8001/Carros");
        if (resposta.status == 200) {
          const result = await resposta.json();
          setCarros(result);
        }
        if (resposta.status == 400) {
          const result = await resposta.json();
          setErroMensagem(result.mensagem);
        }
      } catch (erro: any) {
        setErroMensagem("Erro ao Realizar o fetch no backend");
      }
    };
    fetchData();
  }, []);

  async function trataForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const CadastrarCarro: CarrosState = {
      id: parseInt(id),
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
      const resposta = await fetch("http://localhost:8001/Carros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(CadastrarCarro),
      });
      if (resposta.status == 200) {
        const result = await resposta.json();
        setCarros([...carros, result]);
      }
      if (resposta.status == 400) {
        const result = await resposta.json();
        setErroMensagem(result.mensagem);
      }
    } catch (erro: any) {
      setErroMensagem("Erro ao Realizar o fetch no backend");
    }
  }
  function trataId(event: React.ChangeEvent<HTMLInputElement>) {
    setId(event.target.value);
  }
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
    setDescricao(event.target.value);
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
              type="number"
              name="id"
              id="id"
              placeholder="Id"
              onChange={trataId}
            />
            <input
              type="text"
              name="nome"
              id="nome"
              placeholder="Nome"
              onChange={trataNome}
            />
            <input
              type="text"
              name="marca"
              id="marca"
              placeholder="Marca"
              onChange={trataMarca}
            />
            <input
              type="number"
              name="preco"
              id="preco"
              placeholder="Preço"
              onChange={trataPreco}
            />
            <input
              type="text"
              name="cor"
              id="cor"
              placeholder="Cor"
              onChange={trataCor}
            />
            <input
              type="text"
              name="categoria"
              id="categoria"
              placeholder="Categoria"
              onChange={trataCategoria}
            />
            <input
              type="number"
              name="ano"
              id="ano"
              placeholder="Ano"
              onChange={trataAno}
            />
            <input
              type="text"
              name="descricao"
              id="descricao"
              placeholder="Descrição"
              onChange={trataDescricao}
            />
            <input
              type="url"
              name="linkimg"
              id="linkimg"
              placeholder="Link da Imagem"
              onChange={trataImg}
            />
            <input type="submit" value="Cadastrar" />
          </form>
        </div>
        <div className="container-listagem">
          {carros.map((carro) => {
            return (
              <div key={carro.id} className="container-Carros">
                <img src={carro.linkimg}></img>
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
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default CadastroVeiculos;
