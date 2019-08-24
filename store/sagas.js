import { put, takeEvery, take, takeLatest ,all, select, call, fork, cancel } from 'redux-saga/effects'
import { getList, login, clearStorage, setStorage } from '../api'
import { SAVE_LIST, SAVE_LIST_START, SAVE_LIST_ERROR, START_LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './actionType'

function* getListAction () {
    try {
        const res = yield call(getList)
        yield put({
            type: SAVE_LIST,
            payload: {
                list: res.data.list
            }
        })
    } catch (error) {
        yield put({
            type: SAVE_LIST_ERROR,
            payload: {
                error
            }
        })
    }
}

function* logger () {
    yield takeEvery('*', function* log(action) {
        const state = yield select()
        console.info('action: ', action)
        console.info('after state: ', state)
    })
}

function* watchGetList () {
    yield takeLatest(SAVE_LIST_START, getListAction)
}

function* authorize(user, password, remember) {
    try {
        const res = yield call(login, {user, password})
        if (res.code === 0) {
            yield put({
                type: LOGIN_SUCCESS,
                payload: {
                    token: res.data.token,
                    modules: res.data.modules
                }
            })
            if (remember) {
                setStorage('user', user)
                setStorage('password', password)
            }
            return res.data.token
        } else {
            throw new Error('登陆失败')
        }
    } catch (error) {
        yield put({
            type: LOGIN_FAIL,
            error
        })
    }
}

function* watchLogin () {
    while(true) {
        const { payload: { user, password, remember } } = yield take(START_LOGIN)
        const task = yield fork(authorize, user, password, remember)
        const action = yield take([LOGOUT, LOGIN_FAIL])
        if (action === LOGOUT) {
            yield cancel(task)
        }
        yield clearStorage()
    }
}

export default function* rootSaga() {
    yield all([
        logger(),
        watchLogin(),
        watchGetList()
    ])
}
