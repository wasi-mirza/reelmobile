import {LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, SIGN_OUT} from '../actions'

const initialState = {
    email: __DEV__?'':'',
    password: __DEV__?'':'',

    // email: '',
    // password: '',
    userInfo: null
}

export default (state=initialState, action) => {
    switch (action.type) {
        default:
            break
        case LOGIN_SUCCESS: {
            const {userInfo, rememberMe, email, password} = action.payload
            if (rememberMe) {
                return {email, password, userInfo}
            }
            return {email: '', password: '', userInfo}
        }
        case SIGN_OUT: {
            const {email, password} = action.payload
            return {email, password}
        }
        case LOGIN_FAIL: {
            return {...initialState}
        }
    }
    return state
}
