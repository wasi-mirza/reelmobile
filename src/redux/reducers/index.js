import { combineReducers } from 'redux'

import userReducer from './userReducer'
import loginReducer from './loginReducer'

export default combineReducers({
    userReducer, loginReducer
})