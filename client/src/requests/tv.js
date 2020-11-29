import axios from "axios";

const API = "http://localhost:3000/api"

const popular = () => {
    return axios.get(API + '/tmdb/tv/popular', )
}

const topRated = () => {
    return axios.get(API + '/tmdb/tv/top_rated', )
}

export const requestTV = {popular, topRated};
