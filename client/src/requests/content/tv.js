import axios from "axios";

const API = "http://localhost:3000/api"

const popular = (id) => {
    return axios.get(API + '/tmdb/tv/popular', {params: {userId: id}})
}

const topRated = (id) => {
    return axios.get(API + '/tmdb/tv/top_rated', {params: {userId: id}})
}
const search = (data, id) => {
    return axios.get(API + '/tmdb/tv/search', {params: {query: data, userId: id}})
}

export const requestTV = {popular, topRated, search};
