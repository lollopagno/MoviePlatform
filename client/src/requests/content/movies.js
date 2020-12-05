import axios from "axios";

const API = "http://localhost:3000/api"

const popular = (id) => {
    return axios.get(API + '/tmdb/movies/popular',{params:{ userId: id}})
}

const topRated = () => {
    return axios.get(API + '/tmdb/movies/top_rated',)
}

const upcoming = () => {
    return axios.get(API + '/tmdb/movies/upcoming',)
}

const search = (data) => {
    return axios.get(API + '/tmdb/movies/search', {params: {query: data}})
}

export const requestMovies = {popular, topRated, upcoming, search};
