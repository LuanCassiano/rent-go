import { combineReducers } from 'redux'

import auth from './auth'
import driver from './driver'
import driver_money from './driver_money_raised'
import driver_rating from './driver_rating'
import driver_van from './driver_van'

const reducers = combineReducers({
    auth,
    driver,
    driver_money,
    driver_rating,
    driver_van
})

export default reducers