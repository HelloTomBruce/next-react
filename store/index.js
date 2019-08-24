import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import combineReducer from './combineReducer.js'
import rootSaga from './sagas.js'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(combineReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

export default store