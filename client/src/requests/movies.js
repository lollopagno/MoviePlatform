import axios from "axios";

const API = "http://localhost:3000/api"

const popular = () => {
    return axios.get(API + '/tmdb/movies/popular', )
}

const topRated = () => {
    return axios.get(API + '/tmdb/movies/top_rated', )
}

const upcoming = () => {
    return axios.get(API + '/tmdb/movies/upcoming', )
}

export const requestFilm = {popular, topRated, upcoming};
