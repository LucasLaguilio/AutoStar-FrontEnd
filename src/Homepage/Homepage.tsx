import { useState, useEffect } from "react";
import "./Homepage.css";
import "./HeaderHomepage.css";

interface VeiculoState {
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

function Homepage() {
  const [veiculos, setVeiculos] = useState<VeiculoState[]>([]);
  const [erroMensagem, setErroMensagem] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resposta = await fetch("http://localhost:8000/Carros");
        if (resposta.status === 200) {
          const result = await resposta.json();
          setVeiculos(result);
        } else if (resposta.status === 400) {
          const result = await resposta.json();
          setErroMensagem(result.mensagem);
        }
      } catch (erro: any) {
        setErroMensagem("Erro ao Realizar o fetch no backend");
      }
    };
    fetchData();
  }, []);

  return (
    <main>
      <div>
        {erroMensagem && (
          <div className="mensagem-erro">
            <p>{erroMensagem}</p>
          </div>
        )}
        <div className="container-listagem">
          {veiculos.map((veiculo) => {
            return (
              <div key={veiculo.id} className="container-Carros">
                <img src={veiculo.linkimg}></img>
                <div className="Carros-nome">
                  {" "}
                  <text>Nome: {veiculo.nome}</text>
                </div>
                <div className="Carros-marca">
                  {" "}
                  <text> Marca: {veiculo.marca}</text>
                </div>
                <div className="Carros-cor">
                  {" "}
                  <text> Cor: {veiculo.cor}</text>
                </div>
                <div className="Carros-categoria">
                  <text> Categoria: {veiculo.categoria} </text>
                </div>
                <div className="Carros-ano">
                  {" "}
                  <text> Ano: {veiculo.ano}</text>
                </div>
                <div className="Carros-descricao">
                  <text> Descrição: {veiculo.descricao} </text>
                </div>
                <div className="Carros-preco">
                  <text>
                    {" "}
                    <strong> Preço: {veiculo.preco} R$ </strong>{" "}
                  </text>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Homepage;
