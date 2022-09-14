import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import api from '../../services/api'

function Filmes() {

    const { id } = useParams()
    const [filme, setFilme] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function LoadFilme(){
            await api.get(`/movie/${ id }`, {
                params:{
                    api_key: 'e4fd055054c49680363b44c1de475fa3',
                    language: "pt-BR"
                }
            })
            .them((response)=>{
                setFilme(response.data)
                setLoading(false)
            })
            .catch(()=>{
                console.log('Filme não encontrado')
            })
        }

        LoadFilme()
    }, [])


    return (
        <div>
            <h1>Filmes</h1>
        </div>
    )
}

export default Filmes;