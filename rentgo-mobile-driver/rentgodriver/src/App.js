import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import Routes from './routes'

import OneSignal from 'react-native-onesignal'

function App () {

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
        OneSignal.addEventListener('received', receivedPush)
        OneSignal.addEventListener('opened', openedPush)
        OneSignal.addEventListener('ids', idsPush)

    }, [])

    function receivedPush(push) {
        console.log('push', push)
    }

    function openedPush(push) {
        if(push.action.actionID === "1") {
            console.log('viagem aceita')
            return
        }

        if(push.action.actionID === "2") {
            console.log('viagem recusada')
            return
        }
    }

    async function idsPush(push) {
        console.log('ids', push)

        await AsyncStorage.setItem('OneSignalId', push.userId)
    }

	const Screens = Routes(logged)

	return (
		<Screens />
	)
}

export default App