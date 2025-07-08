import React, { useEffect, useState } from "react"

interface VendasState {
  id: number,
  Carroid: number,
  Clientesid: number,
  Datavenda: string,
  Precovenda: number,
}


function CadastroVendas() {
  const [id, setId] = useState("")
  const [Carroid, setCarroid] = useState("")
  const [Clientesid, setClientesid] = useState("")
  const [Datavenda, setDatavenda] = useState("")
  const [Precovenda, setPrecovenda] = useState("")
  const [erroMensagem, setErroMensagem] = useState("")
   const [Vendas, setVendas] = useState<VendasState[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resposta = await fetch("http://localhost:8000/Vendas")
        if (resposta.status == 200) {
          const result = await resposta.json()
          setVendas(result)
        }
        if (resposta.status == 400) {
          const result = await resposta.json()
          setErroMensagem(result.mensagem)
        }
      } catch (erro: any) {
        setErroMensagem("Erro ao Realizar o fetch no backend")
      }
    }
    fetchData()
  }, []) 

  async function trataForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const CadastrarVendas: VendasState = {
      id: parseInt(id),
      Carroid: parseInt(Carroid),
      Clientesid: parseInt(Clientesid),
      Datavenda,
      Precovenda: parseFloat(Precovenda)
      
    }
    
    try {
      const resposta = await fetch("http://localhost:8000/Vendas",{
      method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(CadastrarVendas)
        })
        if (resposta.status == 200) {
          const result = await resposta.json()
          setVendas([...Vendas, result])
        }
        if (resposta.status == 400) {
          const result = await resposta.json()
          setErroMensagem(result.mensagem)
        }
      } catch (erro: any) {
        setErroMensagem("Erro ao Realizar o fetch no backend")
      }

  }
  function trataId(event: React.ChangeEvent<HTMLInputElement>) {
    setId(event.target.value)
  }
  function trataCarroid(event: React.ChangeEvent<HTMLInputElement>) {
    setCarroid(event.target.value)
  }
  function trataClientesid(event: React.ChangeEvent<HTMLInputElement>) {
    setClientesid(event.target.value)
  }
  function trataDatavenda(event: React.ChangeEvent<HTMLInputElement>) {
    setDatavenda(event.target.value)
  }
  function trataPrecovenda(event: React.ChangeEvent<HTMLInputElement>) {
    setPrecovenda(event.target.value)
  }
  
  return (
    <>
      {erroMensagem &&
        <div className="mensagem-erro">
          <p>{erroMensagem}</p>
        </div>
      }

      <div className="container">

        <div className="container-cadastro">
          <h1>Cadastrar Vendas</h1>
          <form onSubmit={trataForm}>
            <input type="number" name="id" id="id" placeholder="Id" onChange={trataId} />
            <input type="number" name="Carroid" id="Carroid" placeholder="ID Do Carro" onChange={trataCarroid} />
            <input type="number" name="Clientesid" id="Clientesid" placeholder="ID Do Cliente" onChange={trataClientesid} />
            <input type="text" name="Datavenda" id="Datavenda" placeholder="Data Da Venda" onChange={trataDatavenda} />
            <input type="number" name="Precovenda" id="Precovenda" placeholder="Preco Da Venda" onChange={trataPrecovenda} />
            <input type="submit" value="Cadastrar" />
          </form>
        </div>
        <div className="container-listagem">
          {Vendas.map(Venda => {
            return (
              <div key={Venda.id} className="container-Carros">
                <div className="Vendas-id"> 
                  ID Vendas: {Venda.id}
                  </div>
                <div className="Vendas- Carroid">
                  ID Carro: {Venda. Carroid}
                </div>
                <div className="Vendas-Clientesid"> 
                  ID Cliente: {Venda.Clientesid}
                  </div>
                <div className="Vendas-Datavenda">
                  Data da Venda {Venda.Datavenda}
                </div>
                <div className="Vendas-Precovenda"> 
                Preço: {Venda.Precovenda}
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
export default CadastroVendas