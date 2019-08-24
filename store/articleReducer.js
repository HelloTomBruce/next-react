const initState = {
    list: []
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'SAVE_ARTICLE_LIST':
            return {
                ...state,
                list: action.payload.list
            }
        default:
            return state
    }
}

export default reducer