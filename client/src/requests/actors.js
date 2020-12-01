import axios from "axios";

const API = "http://localhost:3000/api"

const popular = () => {
    return axios.get(API + '/tmdb/actors/popular', )
}
const search = (data) => {
    return axios.get(API + '/tmdb/actors/search', {params: {query: data}})
}

export const requestActors = {popular, search};
