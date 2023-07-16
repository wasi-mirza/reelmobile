import {LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, SIGN_OUT} from '../actions'

const initialState = {
    loading: false,
    message: ''
}

export default (state=initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                loading: true,
                message: ''
            }
        }
        case SIGN_OUT: {
            return {
                loading: false,
                message: ''
            }
        }
        case LOGIN_FAIL: {
            const message = action.payload
            return {
                loading: false, message
            }
        }
        case LOGIN_SUCCESS:
            return initialState
        default:
            return state
    }
}