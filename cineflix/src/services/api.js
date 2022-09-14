//https://api.themoviedb.org/3/movie/now_playing?api_key=e4fd055054c49680363b44c1de475fa3

///https://api.themoviedb.org/3/

import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;