import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import Routes from './routes'

import api from './services/api'

import OneSignal from 'react-native-onesignal'

function App (props) {

    const [logged, setLogged] = useState(false)

    useEffect(() => {
        async function loadDataFromStorage() {
            const data = await AsyncStorage.getItem('RentGoDriverToken')
            if(data) {
                setLogged(true)
                return
            }
        }

        loadDataFromStorage()
    }, [])

    useEffect(() => {
        OneSignal.init('2b04fa6d-926d-48dc-a434-f8dcd3d61a77')
        OneSignal.addEventListener('ids', idsPush)

    }, [])

    async function idsPush(push) {

        await AsyncStorage.setItem('OneSignalId', push.userId)
    }

	const Screens = Routes(logged)

	return (
		<Screens />
	)
}

export default App