import axios from "axios";

const API = "http://localhost:3000/api"

// Validation token email
const tokenEmail = (data) => {
    return axios.post(API + '/token/email/confirmation', data)
}

// Validation token sign in
const meFromToken = (headers) => {
    return axios.post(API + '/token/authentication/check', {}, headers)
}

// Validation token email
const resendTokenEmail = (email) => {
    return axios.post(API + '/token/email/resend', email)
}

export const request = {tokenEmail, resendTokenEmail, meFromToken};
