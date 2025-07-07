import { useState, useEffect } from "react";


interface VeiculoState {
  id: number,
  nome: string,
  marca: string,
  preco: number,
  cor: string,
  categoria: string,
  ano: number,
  descricao: string,
  linkimg: string
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
       {erroMensagem && <div className="mensagem-erro"><p>{erroMensagem}</p></div>}
        <div className="container-listagem">
          
          <ul>
            {veiculos.map(veiculo => (
              <li key={veiculo.id}>
                <img className="imagem" src={veiculo.linkimg} /> {veiculo.nome} - {veiculo.marca} - {veiculo.ano} - {veiculo.categoria} - {veiculo.cor} - {veiculo.preco} 
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
   

}


export default Homepage;