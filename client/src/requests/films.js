import axios from "axios";

const API = "http://localhost:3000/api"

const popular = () => {
    return axios.get(API + '/tmdb/films/popular', )
}

export const requestFilm = {popular};
