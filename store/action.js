import { SAVE_LIST_START, START_LOGIN, LOGOUT } from './actionType.js'

export const saveListAsync = () => {
    return {
        type: SAVE_LIST_START
    }
}

export const startLogin = (payload) => {
    return {
        type: START_LOGIN,
        payload
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}