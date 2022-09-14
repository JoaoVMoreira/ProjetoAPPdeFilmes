import { useEffect, useState } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import './home.css'


function Home(){

    const [filmes, setFilmes] = useState([]) // Irá realizar o armazenamento dos itens retirados da api pelo useEffect
    const [loading, setLoading] = useState(true)

    useEffect(() => { //Acessando os dados da API

        async function loadFilmes() { //Função para carregamento dos filmes
            const response = await api.get("movie/now_playing", { //Await instrue que a proxima instrução somente seja realizada após o carregamento completo desta
                //Informando parâmetros
                params: {
                    api_key: "e4fd055054c49680363b44c1de475fa3",
                    language: "pt-BR",
                    page: 1
                }
            })

            //console.log(response.data.results.slice(0, 10))

            setFilmes(response.data.results.slice(0, 10)) //Passando os dados selecionados para a State
            //.slice está filtrando somente os 10 primeiros titulos.
        }

        loadFilmes()
        setLoading(false)
    })

    if (loading){
        return(
            <div className='loading'>
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    return(
        <div className='conteiner'>
            <div className='lista-filmes'>
                {filmes.map((filme)=>{
                    return(
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
                            <Link to={`/filmes/${filme.id}`} >Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;