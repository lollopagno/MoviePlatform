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

export const requestRating = {update};
