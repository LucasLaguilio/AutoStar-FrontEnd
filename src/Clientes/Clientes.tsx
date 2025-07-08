import React, { useState, useEffect}  from "react";




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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resposta = await fetch('http://localhost:8001/Clientes')
                if (resposta.status === 200) {
                    const result = await resposta.json()
                    setClientes(result)
                }
                if (resposta.status === 400) {
                    const result = await resposta.json()
                    setErroMensagem(result.mensagem)
                }
            } catch (erro: any) {
                setErroMensagem('Erro ao realizar o fetch no backend')
            }
        }
        fetchData()
    }, [])

    async function trataForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const novoCliente: ClientesState = {
            id: parseInt(id),
            nome,
            email,
            telefone
        }

        try {
            const resposta = await fetch('http://localhost:8001/Clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoCliente)
            })

            if (resposta.status === 200) {
                const result = await resposta.json()
                setClientes([...clientes, result])
            }
            if (resposta.status === 400) {
                const result = await resposta.json()
                setErroMensagem(result.mensagem)
            }
        } catch (erro: any) {
            setErroMensagem('Erro ao realizar o fetch no backend')
        }
    }

    return (
        <>
        {erroMensagem && <div className="mensagem-erro"><p>{erroMensagem}</p></div>}

        <div className="container">
            <div className="container-cadastro">
                <h1>Cadastrar Cliente</h1>
                <form onSubmit={trataForm}>
                    <input type="number" placeholder="ID" onChange={e => setId(e.target.value)}/>
                    <input type="text" placeholder="Nome" onChange={e => setNome(e.target.value)} />
                    <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                    <input type="text" placeholder="Telefone" onChange={e => setTelefone(e.target.value)}/>
                    <input type="submit" value='Cadastrar'/>
                </form>
            </div>

            <div className="container-listagem">
                {clientes.map(cliente => (
                    <div key={cliente.id} className="container-Clientes" >
                        <div>Id: {cliente.id} </div>
                        <div>Nome: {cliente.nome} </div>
                        <div>Email: {cliente.email}</div>
                        <div>Telefone: {cliente.telefone} </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}



export default CadastroClientes