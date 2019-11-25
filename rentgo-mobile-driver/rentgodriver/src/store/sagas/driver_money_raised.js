import { call, put } from 'redux-saga/effects'
import api from '../../services/api'

import { Creators as DriverMoneyActions } from '../ducks/driver_money_raised'

export function* getDriverMoney({ payload: { id }}) {
    try {
        const response = yield call(api.get, `/api/driver-money/${id}`)

        yield put(DriverMoneyActions.getDriverMoneyRaisedSuccess(response.data.driver_money))
    } catch (error) {
        console.tron.log('error', error)
    }
}