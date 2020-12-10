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

/**
 * Check if the email is format valid
 */
async function isEmailFormatValid(email) {
    const res = await isValidEmail(email)
    return [res.data.email, res.data.message]
}

/**
 * Check if the email is already present
 */
async function isEmailValid(email) {
    const users = await sameField("email", email)
    const usernameDb = users.data.data
    if (usernameDb !== []) {
        if (usernameDb.email === email) {
            return false
        }
    }
    return true
}

/**
 * Check if the username is already present
 */
async function isUserValid(username) {
    const users = await sameField("username", username)
    const usernameDb = users.data.data
    if (usernameDb !== []) {
        if (usernameDb.username === username) {
            return false
        }
    }
    return true
}


export const request = {signUp, signIn, isEmailValid, isUserValid, isEmailFormatValid};
