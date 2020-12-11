import axios from "axios";

const API = "http://localhost:3000/api"

const signUp = (user) => {
    return axios.post(API + '/user/new_user', user)
}

const sameField = (field, data) => {
    return axios.get(API + '/user/same_field', {params: {field: field, data: data}})
}

const sameFieldExceptUser = (field, data, userId) => {
    return axios.get(API + '/user/not_same_field', {params: {field: field, data: data, id: userId}})
}

const isValidEmail = email => {
    return axios.get(API + '/email/validation', {params: {email: email}})
}

const signIn = (credential) => {
    return axios.post(API + '/user/sign_in', credential)
}

const updateUserData = (userId, name, username, email) => {
    return axios.put(API + '/user/change_data', {userId: userId, name: name, username: username, email: email})
}

const deleteUser = (userId) => {
    return axios.delete(API + '/user/delete_account', {data: {userId: userId}})
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
async function isEmailValid(email, checkIsPresent, userId) {

    if (checkIsPresent) {
        const users = await sameField("email", email)
        const usernameDb = users.data.data
        if (usernameDb !== []) {
            if (usernameDb.email === email) {
                return false
            }
        }
        return true
    } else {
        const users = await sameFieldExceptUser("email", email, userId)
        return users.data.data.length === 0
    }

}

/**
 * Check if the username is already present
 */
async function isUserValid(username, checkPresent, userId) {

    if (checkPresent) {
        const users = await sameField("username", username)
        const usernameDb = users.data.data
        if (usernameDb !== []) {
            if (usernameDb.username === username) {
                return false
            }
        }
        return true
    } else {
        const users = await sameFieldExceptUser("username", username, userId)
        return users.data.data.length === 0
    }
}


export const request = {signUp, signIn, isEmailValid, isUserValid, isEmailFormatValid, updateUserData, deleteUser};
