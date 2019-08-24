import { combineReducers } from 'redux'

import list from './listReducer.js'
import article from './articleReducer.js'
import login from './loginReducer.js'

const rootReducer = combineReducers({
    list,
    article,
    login
})

export default rootReducer