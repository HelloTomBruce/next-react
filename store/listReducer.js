import { SAVE_LIST } from './actionType.js'

const initState = {
    list: []
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case SAVE_LIST:
            return {
                ...state,
                list: action.payload.list
            }
        default:
            return state
    }
}

export default reducer