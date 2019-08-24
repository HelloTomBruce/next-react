import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './actionType'
import defaultModules from '../config/defaultModules'

const initState = {
    token: '',
    isLogin: false,
    modules: defaultModules
}

const LoignReducer = (state = initState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                isLogin: true,
                modules: action.payload.modules
            }
        case LOGIN_FAIL:
            return state
        case LOGOUT:
            return {
                ...state,
                isLogin: false,
                modules: defaultModules
            }
        default:
            return state
    }
}

export default LoignReducer