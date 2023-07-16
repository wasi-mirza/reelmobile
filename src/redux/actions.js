export const LOGIN = 'LOGIN'
export const SIGN_OUT = 'SIGN_OUT'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

export const signIn = loginInfo => {
    return {
        type: LOGIN,
        payload: loginInfo
    }
}

export const resetLogin = () => {
    return {
        type: LOGIN_FAIL,
    }
}

export const signOut = signoutInfo => {
    return {
        type: SIGN_OUT,
        payload: signoutInfo
    }
}