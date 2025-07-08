import { useState, useEffect } from "react";

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
        const resposta = await fetch("http://localhost:8001/Carros");
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
                <div className="Carros-nome">Nome: {veiculo.nome}</div>
                <div className="Carros-marca">Marca: {veiculo.marca}</div>
                <div className="Carros-cor">Cor: {veiculo.cor}</div>
                <div className="Carros-categoria">
                  Categoria: {veiculo.categoria}
                </div>
                <div className="Carros-ano">Ano: {veiculo.ano}</div>
                <div className="Carros-descricao">
                  Descrição: {veiculo.descricao}
                </div>
                <div className="Carros-preco">
                  <strong> Preço: {veiculo.preco} R$ </strong>
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
