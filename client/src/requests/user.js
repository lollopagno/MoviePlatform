import axios from "axios";

const API = "http://localhost:3000/api"

const signUp = (user) => {
    return axios.post(API + '/user/new_user', user)
}

const sameField = (field, data) => {
    return axios.get(API + '/user/same_field', {params: {field: field, data: data}})
}

const isValidEmail = email => {
    return axios.get(API + '/email/validation', {params: {email: email}})
}

// Validation token email
const tokenEmail = (data) => {
    return axios.post(API + '/token/email/confirmation', data)
}

// Validation token email
const resendTokenEmail = (email) => {
    return axios.post(API + '/token/email/resend', email)
}

const signIn = (credential) => {
    return axios.post(API + '/user/sign_in', credential)
}

// Validation token sign in
const meFromToken = (headers) => {
    return axios.post(API + '/token/authentication/check', {}, headers)
}

export const request = {signUp, sameField, isValidEmail, tokenEmail, resendTokenEmail, signIn, meFromToken};
