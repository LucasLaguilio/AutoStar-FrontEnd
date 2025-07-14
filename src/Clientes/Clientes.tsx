import React, { useState, useEffect } from "react";
import './CadastroClientes.css'

interface ClientesState {
    id: number,
    nome: string,
    email: string,
    telefone: string
}

function CadastroClientes() {
  const [id, setId] = useState('')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [erroMensagem, setErroMensagem] = useState('')
  const [clientes, setClientes] = useState<ClientesState[]>([])
  const [modoEdicao, setModoEdicao] = useState(false)

  useEffect(() => {
const fetchData = async () => {
    try {
        const resposta = await fetch('http://localhost:8000/Clientes')
        const result = await resposta.json()
        if (resposta.status === 200) {
          setClientes(result)
        } else {
          setErroMensagem(result.mensagem)
      }
    } catch {
        setErroMensagem('Erro ao realizar o fetch no backend')
    }
}
fetchData()}, [])

function preencherFormulario(cliente: ClientesState) {
  setId(String(cliente.id))
  setNome(cliente.nome)
  setEmail(cliente.email)
  setTelefone(cliente.telefone)
  setModoEdicao(true)}

async function deletarCliente(id: number) {
  try {
    const resposta = await fetch(`http://localhost:8000/Clientes/${id}`, {
      method: 'DELETE'
  })
    const result = await resposta.json()
    if (resposta.status === 200) {
      setClientes(clientes.filter(c => c.id !== id))
  } else {
      setErroMensagem(result.mensagem)
  }
} catch {
    setErroMensagem('Erro ao excluir cliente')
}}

async function trataForm(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()
  const clienteObj: ClientesState = {
    id: parseInt(id),
    nome,
    email,
    telefone
}

  try {
    const resposta = await fetch('http://localhost:8000/Clientes', {
      method: modoEdicao ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(clienteObj)
})

    const result = await resposta.json()

    if (resposta.status === 200) {
      if (modoEdicao) {
          setClientes(clientes.map(c => c.id === clienteObj.id ? clienteObj : c))
      } else {
          setClientes([...clientes, clienteObj])
      }
      setId('')
      setNome('')
      setEmail('')
      setTelefone('')
      setModoEdicao(false)
      } else {
          setErroMensagem(result.mensagem)
      }
  } catch {
      setErroMensagem('Erro ao se comunicar com o backend')
  }}

  return (
  <>
    {erroMensagem && <div className="mensagem-erro"><p>{erroMensagem}</p></div>}

    <div className="container">
      <div className="container-cadastro">
        <h1>{modoEdicao ? 'Editar Cliente' : 'Cadastrar Cliente'}</h1>
          <form onSubmit={trataForm}>
            <input type="number" placeholder="ID" value={id} onChange={e => setId(e.target.value)}disabled={modoEdicao}/>
            <input type="text" placeholder="Nome" value={nome}onChange={e => setNome(e.target.value)}/>
            <input type="email" placeholder="Email" value={email}onChange={e => setEmail(e.target.value)}/>
            <input type="text" placeholder="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)}/>
            <input className="btnU" type="submit" value={modoEdicao ? 'Atualizar' : 'Cadastrar'} />
            {modoEdicao && (
              <button className="btnCancelar" type="button" onClick={() => { 
                setId('')
                setNome('')
                setEmail('')
                setTelefone('')
                setModoEdicao(false)
              }}>Cancelar Edição</button>
            )}
          </form>
          </div>

          <div className="container-listagem">
            {clientes.map(cliente => (
              <div key={cliente.id} className="container-Clientes">
                <div>Id: {cliente.id}</div>
                <div>Nome: {cliente.nome}</div>
                <div>Email: {cliente.email}</div>
                <div className="Telefone" >Telefone: {cliente.telefone}</div>
                <button className="btnEditar" onClick={() => preencherFormulario(cliente)}>Editar</button>
                <button className="btnExcluir" onClick={() => deletarCliente(cliente.id)}>Excluir</button>
              </div>
            ))}
          </div>
      </div>
  </>)
}

export default CadastroClientes
