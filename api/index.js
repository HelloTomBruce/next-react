import 'isomorphic-fetch'
import config from './config'

export const getList = async function() {
    const res = await fetch(config.host + '/topSwiper')
    const json = await res.json()
    return json
}

export const login = async ({user, password}) => {
    const res = await fetch(config.host + '/login', {
        method: 'POST',
        body: JSON.stringify({
            user,
            password
        })
    })
    const json = await res.json()
    return json
}

export const setStorage = (key, val) => {
    const res = window.localStorage.setItem(key, val)
    return res
}

export const removeStorage = (key) => {
    window.localStorage.removeItem(key)
}

export const clearStorage = () => {
    window.localStorage.clear()
}

export const getStorage = (key) => {
    let val = window.localStorage.getItem(key)
    if (val !== val) {
       return false
    } else {
        return val
    }
}