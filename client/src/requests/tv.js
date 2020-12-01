import axios from "axios";

const API = "http://localhost:3000/api"

const popular = () => {
    return axios.get(API + '/tmdb/tv/popular', )
}

const topRated = () => {
    return axios.get(API + '/tmdb/tv/top_rated', )
}
const search = (data) => {
    return axios.get(API + '/tmdb/tv/search', {params: {query: data}})
}

export const requestTV = {popular, topRated, search};
