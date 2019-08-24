import { getStorage } from '../api/index'

export const checkUserAndPwd = () => {
    let user = getStorage('user')
    let password = getStorage('password')
    if (user && password) {
        return {user, password}
    } else {
        return false
    }
}