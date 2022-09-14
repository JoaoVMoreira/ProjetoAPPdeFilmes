import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import "./filme-info.css"
import { toast } from 'react-toastify';

import api from '../../services/api';

function Filme() {
    const { id } = useParams(); //Capturando o id do filme 
    const navigate = useNavigate() //irá direcionar o usuário para a página inicial ao tentar acessar um id inexistente
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true); // Configurando tela de carregamento ao abrir site

    useEffect(() => {
        async function loadFilme() { //Função carregar filme
            await api.get(`/movie/${id}`, { //Selelionando filme a partir do id 
                params: { //Setando parâmetros
                    api_key: "e4fd055054c49680363b44c1de475fa3",
                    language: "pt-BR",
                }
            })
                .then((response) => { //Em caso de sucesso o filme é exibido e a tela de carregamentpo muda para "false"
                    setFilme(response.data);
                    setLoading(false);
                })
                .catch(() => { // Em caso de erro é dado o console.log de filme não encontrado
                    console.log("FILME NAO ENCONTRADO")
                    navigate('/', { replace: true}) //Em caso de erro o usuário é redirecionado para a página inicial
                    return
                })
        }

        loadFilme(); //Carregando a função loadFilme


    }, [navigate, id]) //Informando componentes externos a useEffect para não apresentar erro no console.log


    function salvarFilme(){
        const minhaLista = localStorage.getItem('@cineflix') //Criando variavel minha lista que recebe os filmes salvos

        let filmesSalvos  = JSON.parse(minhaLista) || [] // Variavel filmes salvos que recebe o valor convertido de JSON. Caso não tenha nada inserido o mesmo retorna um valor vazio
        
        const hasFilme = filmesSalvos.some((filmesSalvos)=> filmesSalvos.id === filme.id) //Foi criada uma variavel que verifica se  em filmesSalvos possui algum filme com o mesmo id de "Filmes"
        
        if (hasFilme){ //Defindo ação para caso o filme já esteja na lista de filmesSalvos
            toast.warn('Este filme já está salvo em sua lista!')
            return
        }

        filmesSalvos.push(filme) //salva o filme nem filmes salvos
        localStorage.setItem("@cineflix", JSON.stringify(filmesSalvos)) //Manda o filme para localStorage (convertendo de JSON para string)
        toast.success('Filme salvo com sucesso!')
    }

    if (loading) { // mMontando tela de carregamento 
        return (
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return ( //Montando tela de detalhes do filme
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avalição: {filme.vote_average} / 10</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel='external' href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
                </button>
            </div>

        </div>
    )
}

export default Filme;