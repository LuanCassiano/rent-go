import React, { useState, useEffect } from 'react'
import { AsyncStorage } from 'react-native'
import Routes from './routes'

import OneSignal from 'react-native-onesignal'


export default function App() {

    const [logged, setLogged] = useState(false);

    useEffect(() => {
        async function loadDataFromStorage() {
            const data = await AsyncStorage.getItem('RentGoToken')
            if(data) {
                setLogged(true);
                return
            }
        }

        loadDataFromStorage();
    }, [])

    useEffect(() => {
        OneSignal.init('cfa8c730-c144-4d30-92b2-ed85393ff03f')
        OneSignal.addEventListener('received', receivedPush)
        OneSignal.addEventListener('opened', openedPush)
        OneSignal.addEventListener('ids', idsPush)
    }, [])

    function receivedPush(push) {
        console.log('push', push)
    }

    function openedPush(push) {
        console.log('opened', push)
    }

    function idsPush(push) {
        console.log('ids', push)
    }

    const Screens = Routes(logged);

    return (
        <Screens />
    )
}
