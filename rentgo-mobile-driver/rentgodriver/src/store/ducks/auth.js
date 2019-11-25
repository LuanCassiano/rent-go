import produce from 'immer'

export const Types = {
    SIGN_IN_REQUEST: 'auth/SIGN_IN_REQUEST',
    SIGN_IN_SUCCESS: 'auth/SIGN_IN_SUCCESS',
}

const INITIAL_STATE = {
    loading: false,
    token: null,
    signedIn: false,
    authChecked: false,
    initCheckSuccess: null
}

export default function auth(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case Types.SIGN_IN_REQUEST: {
                draft.loading = true
                break
            }

            case Types.SIGN_IN_SUCCESS: {
                draft.loading = false
                draft.authChecked = true
                draft.token = action.payload.token
                break
            }
        
            default:
                return state
        }
    })
}

export const Creators = {
    signInRequest: (email, password) => ({
        type: Types.SIGN_IN_REQUEST,
        payload: {
            email, password
        }
    }),

    signInSuccess: token => ({
        type: Types.SIGN_IN_SUCCESS,
        payload: { token }
    })
}