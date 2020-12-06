import axios from "axios";

const API = "http://localhost:3000/api"

const popular = (id) => {
    return axios.get(API + '/tmdb/movies/popular',{params:{ userId: id}})
}

const topRated = (id) => {
    return axios.get(API + '/tmdb/movies/top_rated', {params:{ userId: id}})
}

const upcoming = (id) => {
    return axios.get(API + '/tmdb/movies/upcoming',{params:{ userId: id}})
}

const search = (data, id) => {
    return axios.get(API + '/tmdb/movies/search', {params: {query: data, userId: id}})
}

export const requestMovies = {popular, topRated, upcoming, search};
