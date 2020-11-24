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

const signIn = (credential) => {
    return axios.post(API + '/user/sign_in', credential)
}

export const request = {signUp, sameField, isValidEmail, signIn};
