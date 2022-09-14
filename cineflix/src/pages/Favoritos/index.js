import { useEffect, useState } from 'react'
import "./favoritos.css"
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function Favoritos(){

    const [filmes, setFilmes] = useState([])

    useEffect(()=>{ //Vai realizar os codigos abaixo no momento da abertura da pagina

        const minhaLista = localStorage.getItem('@cineflix') //Pega os itens salvos em LocalStorage
        setFilmes(JSON.parse(minhaLista) || []) //Passando itens capturados para setFilmes (Convertendo de string para array (JSON.parse))

    }, [])

    function excluirFilme(id){ //Criando função para excluir filme da lista a partir do id fo filme (id já capturado)
        let filtroFilmes = filmes.filter((item)=>{ // Variavel filtro filmes irá filtrar os filmes a partir do comando abaixo
            return(item.id !== id) //Selevionando qoue os filmes a serem devolvidos são "todos menos o id clicado"
            
        })

        setFilmes(filtroFilmes) // Setando lista atualizada de filmes 
        localStorage.setItem('@cineflix', JSON.stringify(filtroFilmes)) //Setando o filtroFilmes para LocalStorage
        toast.success('Filme removido com sucesso!')
    }

    return(
        <div className='meus-filmes'>
            <h1>Meus filmes</h1>

            {filmes.length === 0 && <span> Você não possui filmes salvos</span>}
            <ul>
                {filmes.map((item)=>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filmes/${item.id}`} >Ver Detalhes</Link>
                                <button onClick={()=>{excluirFilme(item.id)}} >Remover</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;