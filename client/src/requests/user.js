import axios from "axios";

const API = "http://localhost:3000/api"

const signUp = (user) => {
    return axios.post(API + '/newUser', user)
}

const sameUsername = username => {
    return axios.get(API + '/sameUsername', {params: {username: username}})
}

const isValidEmail = email => {
    return axios.get(API + '/validationEmail', {params: {email: email}})
}

// Validation token email
const tokenEmail = (data) => {
    return axios.post(API + '/confirmation', data)
}

// Validation token email
const resendTokenEmail = (email) => {
    return axios.post(API + '/resendToken', email)
}


const signIn = (credential) => {
    return axios.post(API + '/signIn', credential)
}

// Validation token sign in
const meFromToken = token => {
    // todo riguardare i parametri.
    return axios.post(API + 'checkToken', {params: {token: token}, headers: {'Authorization': 'Bearer ' + token}})
}

export const request = {signUp, sameUsername, isValidEmail, tokenEmail, resendTokenEmail, signIn, meFromToken};
