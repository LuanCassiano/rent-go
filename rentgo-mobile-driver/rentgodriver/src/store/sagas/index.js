import { all, takeLatest } from 'redux-saga/effects'

import { Types as AuthTypes } from '../ducks/auth'
import { Types as DriverTypes } from '../ducks/driver'
import { Types as DriverMoneyTypes } from '../ducks/driver_money_raised'
import { Types as DriverRatingTypes } from '../ducks/driver_rating'
import { Types as DriverVanTypes } from '../ducks/driver_van'

import { init, signIn } from './auth'
import { getDriver } from './driver'
import { getDriverMoney } from './driver_money_raised'
import { getDriverRating } from './driver_rating'
import { getDriverVan } from './driver_van'

export default function* rootSaga() {
    return yield all([
        init(),
        
        takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
    
        takeLatest(DriverTypes.DRIVER_REQUEST, getDriver),
    
        takeLatest(DriverMoneyTypes.DRIVER_MONEY_REQUEST, getDriverMoney),

        takeLatest(DriverRatingTypes.DRIVER_RATING_REQUEST, getDriverRating),
    
        takeLatest(DriverVanTypes.DRIVER_VAN_REQUEST, getDriverVan),
    ])
}