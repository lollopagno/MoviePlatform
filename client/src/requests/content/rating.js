import axios from "axios";

const API = "http://localhost:3000/api"

const update = (contentId, userId, category, value) => {
    return axios.post(API + '/tmdb/rating/update', {
        params: {
            contentId: contentId,
            userId: userId,
            category: category,
            value: value
        }
    })
}

const search = (userId, isMovies, isTvs, isActors) => {
    return axios.get(API + '/tmdb/rating/search', {
        params: {
            userId: userId,
            isMovies: isMovies,
            isTvs: isTvs,
            isActors: isActors
        }
    })
}

export const requestRating = {update, search};
