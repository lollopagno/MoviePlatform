import axios from "axios";

const API = "http://localhost:3000/api"

const popular = (id) => {
    return axios.get(API + '/tmdb/actors/popular', {params: {userId: id}})
}
const search = (data, id) => {
    return axios.get(API + '/tmdb/actors/search', {params: {query: data, userId: id}})
}

export const requestActors = {popular, search};
