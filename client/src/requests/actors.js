import axios from "axios";

const API = "http://localhost:3000/api"

const popular = () => {
    return axios.get(API + '/tmdb/actors/popular', )
}

export const requestActors = {popular};
