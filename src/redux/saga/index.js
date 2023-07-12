import { all, fork } from 'redux-saga/effects'

import {watchLogin} from './userSaga'

export default function* rootSaga() {
    yield all([
        fork(watchLogin),
    ])
}