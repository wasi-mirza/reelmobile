import { applyMiddleware, createStore } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import {AsyncStorage} from 'react-native'
import { persistReducer } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'

import {name as appName} from '../../app.json'

import reducers from './reducers'

const persistConfig = {
    key: appName,
    storage: AsyncStorage,
    blacklist: ['loginReducer',]
}
const persistedReducer = persistReducer(persistConfig, reducers)
export const sagaMiddleware = createSagaMiddleware()
export default store = createStore(persistedReducer, applyMiddleware(sagaMiddleware))
