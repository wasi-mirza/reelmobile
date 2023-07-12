import {LOGIN, LOGIN_SUCCESS, LOGIN_FAIL} from '../actions'

const initialState = {
    email: __DEV__?'neeraja':'',
    password: __DEV__?'Test@123':'',

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
        case LOGIN_FAIL: {
            return {...initialState}
        }
    }
    return state
}
