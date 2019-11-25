import { call, put } from 'redux-saga/effects'
import api from '../../services/api'

import { Creators as DriverVanActions } from '../ducks/driver_van'

export function* getDriverVan({ payload: { id, page }}) {
    try {
        const response = yield call(api.get, `/api/van?driver=${id}&page=${page}`)

        yield put(DriverVanActions.getDriverVanSuccess(response.data.result))
    } catch (error) {
        console.tron.log('error', error)
    }
}