import { call, put } from 'redux-saga/effects'
import api from '../../services/api'
import AsyncStorage from '@react-native-community/async-storage'
import NavigationService from '../../services/navigation'

import { Creators as AuthActions } from '../ducks/auth'

export function* init() {

    const token = yield call([AsyncStorage, 'getItem'], 'RentGoDriverToken')

    if(token) {
        yield put(AuthActions.signInSuccess(token))
    }
}

export function* signIn(action) {
    try {
        const response = yield call(api.post, '/api/authentication', action.payload)

        yield call([AsyncStorage, 'setItem'], 'RentGoDriverToken', response.data.token)

        if(response.data.token) {
            yield call([AsyncStorage, 'setItem'], 'RentGoDriverToken', response.data.token)
            
            const res = yield call (api.get, '/api/driver-auth')
            yield call([AsyncStorage, 'setItem'], 'RentGoDriverUser', JSON.stringify(res.data.result[0]))

            yield put(AuthActions.signInSuccess(response.data.token))

            NavigationService.navigate('Drawer')

            return
        }
    } catch (err) {
        return err
    }
}