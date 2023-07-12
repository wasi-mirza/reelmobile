import { takeLatest, put, call } from 'redux-saga/effects'
// import moment from 'moment'

import {LOGIN, LOGIN_SUCCESS, LOGIN_FAIL} from '../actions'
import {login} from '../../config/api'

function* handleSaveAccount(action) {
    const {email, password, rememberMe} = action.payload
    if (email && password) {
        try {
            const response = yield call(login, email, password)
            if (response) {
                if (response.status == 200) {
                    const userInfo = response.userInfo
                    if (userInfo) {
                        yield put({type: LOGIN_SUCCESS, payload: {userInfo, rememberMe, email, password}})
                    } else {
                        yield put({type: LOGIN_FAIL, payload: 'No user info!'})
                    }
                } else {
                    if (response.message) {
                        yield put({type: LOGIN_FAIL, payload: response.message})
                    } else {
                        yield put({type: LOGIN_FAIL, payload: 'unknown error!'})
                    }
    
                }
            } else {
                yield put({type: LOGIN_FAIL, payload: 'No response!'})
            }
        } catch (error) {
            console.log('login:', error)
            yield put({type: LOGIN_FAIL, payload: error.message})    
        }
    } else {
        yield put({type: LOGIN_FAIL, payload: ''})
    }
}

export function* watchLogin() {
    yield takeLatest(LOGIN, handleSaveAccount)
}