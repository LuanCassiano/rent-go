import { call, put } from 'redux-saga/effects'
import api from '../../services/api'

import { Creators as DriverRatingActions } from '../ducks/driver_rating'

export function* getDriverRating({ payload: { id }}) {
    try {
        const response = yield call(api.get, `/api/driver-rating/${id}`)

        yield put(DriverRatingActions.getDriverRatingSuccess(response.data))
    } catch (error) {
        console.tron.log('error', error)
    }
}