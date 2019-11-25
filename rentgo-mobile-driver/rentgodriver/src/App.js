import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import createNavigator from './routes'
import NavigationService from './services/navigation'

import { Creators as AuthActions } from './store/ducks/auth'

import OneSignal from 'react-native-onesignal'

function App () {

    const auth = useSelector(state => state.auth)

    const registerService = (ref) => {
        NavigationService.setTopLevelNavigator(ref)
    }

    useEffect(() => {
        OneSignal.init('2b04fa6d-926d-48dc-a434-f8dcd3d61a77')
        OneSignal.addEventListener('ids', idsPush)
    }, [])

    async function idsPush(push) {

        await AsyncStorage.setItem('OneSignalId', push.userId)
    }

    const Routes = createNavigator(auth.authChecked)

	return (
		<Routes ref={registerService}/>
	)
}

export default App