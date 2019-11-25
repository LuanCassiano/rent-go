import produce from 'immer'

export const Types = {
    DRIVER_MONEY_REQUEST: 'driver_money/DRIVER_MONEY_REQUEST',
    DRIVER_MONEY_SUCCESS: 'driver_money/DRIVER_MONEY_SUCCESS'
}

const INITIAL_STATE = {
    loading: true,
    moneyRaised: 0
}

export default function driver_money(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case Types.DRIVER_MONEY_REQUEST: {
                draft.loading = true
                break
            }

            case Types.DRIVER_MONEY_SUCCESS: {
                draft.loading = false
                draft.moneyRaised = action.payload.data
                break
            }
        
            default:
                return state
        }
    })
}

export const Creators = {
    getDriverMoneyRaisedRequest: (id) => ({
        type: Types.DRIVER_MONEY_REQUEST,
        payload: { id }
    }),

    getDriverMoneyRaisedSuccess: (data) => ({
        type: Types.DRIVER_MONEY_SUCCESS,
        payload: { data }
    })
}