import { call, put } from 'redux-saga/effects'
import api from '../../services/api'

import { Creators as DriverActions } from '../ducks/driver'

export function* getDriver({ payload: { id }}) {
    try {
        const response = yield call(api.get, `/api/driver/${id}`)

        yield put(DriverActions.getDriverSuccess(response.data))
    } catch (error) {
        console.log('error', error)
    }
}