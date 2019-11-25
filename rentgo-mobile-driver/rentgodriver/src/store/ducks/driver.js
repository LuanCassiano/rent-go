import produce from 'immer'

export const Types = {
    DRIVER_REQUEST: 'driver/DRIVER_REQUEST',
    DRIVER_SUCCESS: 'driver/DRIVER_SUCCESS',
}

const INITIAL_STATE = {
    loading: true,
    data: [],
    driverTrips: []

}

export default function driver(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case Types.DRIVER_REQUEST: {
                draft.loading = true
                break
            }

            case Types.DRIVER_SUCCESS: {
                draft.loading = false
                draft.data = action.payload.data.driver[0]
                draft.driverTrips = action.payload.data.driver[0].trip
                break
            }
        
            default:
                return state
        }
    })
}

export const Creators = {
    getDriverRequest: (id) => ({
        type: Types.DRIVER_REQUEST,
        payload: { id }
    }),

    getDriverSuccess: (data) => ({
        type: Types.DRIVER_SUCCESS,
        payload: { data }
    })
}