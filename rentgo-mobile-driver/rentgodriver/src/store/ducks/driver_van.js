import produce from 'immer'

export const Types = {
    DRIVER_VAN_REQUEST: 'driver_money/DRIVER_VAN_REQUEST',
    DRIVER_VAN_SUCCESS: 'driver_money/DRIVER_VAN_SUCCESS'
}

const INITIAL_STATE = {
    loading: true,
    data: [],
    page: 0,
    perPage: 0,
    total: 0
}

export default function driver_van(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case Types.DRIVER_VAN_REQUEST: {
                draft.loading = true
                break
            }

            case Types.DRIVER_VAN_SUCCESS: {
                draft.loading = false
                draft.data = action.payload.data.data
                draft.page = action.payload.data.page
                draft.perPage = action.payload.data.perPage
                draft.total = action.payload.data.total
                break
            }
        
            default:
                return state
        }
    })
}

export const Creators = {
    getDriverVanRequest: (id, page) => ({
        type: Types.DRIVER_VAN_REQUEST,
        payload: { id, page }
    }),

    getDriverVanSuccess: (data) => ({
        type: Types.DRIVER_VAN_SUCCESS,
        payload: { data }
    })
}