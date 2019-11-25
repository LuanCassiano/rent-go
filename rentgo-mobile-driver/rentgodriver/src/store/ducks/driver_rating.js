import produce from 'immer'

export const Types = {
    DRIVER_RATING_REQUEST: 'driver_money/DRIVER_RATING_REQUEST',
    DRIVER_RATING_SUCCESS: 'driver_money/DRIVER_RATING_SUCCESS'
}

const INITIAL_STATE = {
    loading: true,
    rating: 0,
    positiveNotes: 0,
    negativeNotes: 0
}

export default function driver_rating(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case Types.DRIVER_RATING_REQUEST: {
                draft.loading = true
                break
            }

            case Types.DRIVER_RATING_SUCCESS: {
                draft.loading = false
                draft.rating = action.payload.data.media
                draft.positiveNotes = action.payload.data.positive,
                draft.negativeNotes = action.payload.data.negative
                break
            }
        
            default:
                return state
        }
    })
}

export const Creators = {
    getDriverRatingRequest: (id) => ({
        type: Types.DRIVER_RATING_REQUEST,
        payload: { id }
    }),

    getDriverRatingSuccess: (data) => ({
        type: Types.DRIVER_RATING_SUCCESS,
        payload: { data }
    })
}